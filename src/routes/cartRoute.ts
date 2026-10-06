import express from "express";
import { getActiveCartForUser, addItemToCart } from "../Services/cartService.js";
import validateJWT from "../middelwares/validateJWT.js"; 
import type { ExtendRequest } from "../types/extendedRequest.js";

const router = express.Router();

// 1. جلب السلة النشطة
router.get('/', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.userId; 
    console.log("--> Route received userId:", userId); 

    if (!userId) {
        return res.status(400).send({ error: "UserId is missing in request" });
    }

    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
});

// 2. إضافة عنصر للسلة
router.post('/items', validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.userId; 
    
    if (!userId) {
        return res.status(400).send({ error: "UserId is missing in request" });
    }

    const { productId, quantity } = req.body; 

    try {
        // ظبطناها هنا لتبقى productId زي ما استقبلناها بالضبط
        const updatedCart = await addItemToCart({ productId, userId, quantity });
        res.status(200).send(updatedCart); 
    } catch (error: any) {
        res.status(500).send({ error: error.message });
    }
});

export default router;