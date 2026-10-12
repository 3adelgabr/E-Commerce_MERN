import express from "express";
import { getActiveCartForUser, addItemToCart, updateItemInCart, deleteItemInCart, clearCart, checkout } from "../Services/cartService.js";import validateJWT from "../middelwares/validateJWT.js"; 
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


router.delete("/", validateJWT, async(req: ExtendRequest, res)=> {
        const userId = req.userId; 
        const response = await clearCart({userId});
        if (!userId) {
        return res.status(400).send({ error: "UserId is missing in request" });
    }
})
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
router.put("/items", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.userId; // استخدمنا نفس الطريقة الصحيحة زي الـ GET والـ POST
    
    if (!userId) {
        return res.status(400).send({ error: "UserId is missing in request" });
    }

    const { productId, quantity } = req.body; 
    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode).send(response.data);
});

router.delete("/items/:productId", validateJWT, async(req: ExtendRequest, res) => {
    const userId =  req.userId;
    const { productId } = req.params;
    const response = await deleteItemInCart({ userId, productId});
        res.status(response.statusCode).send(response.data);

})


router.post("/checkout", validateJWT, async(req: ExtendRequest, res) => {
    const userId = req.userId;
    const {address} = req.body;
    const response = await checkout({userId, address});
  if (!userId) {
        return res.status(400).send({ error: "UserId is missing in request" });
    }
})
export default router;