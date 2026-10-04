import express from "express";
import { getActiveCartForUser } from "../Services/cartService.js";
import validateJWT from "../middelwares/validateJWT.js"; 

const router = express.Router();

router.get('/', validateJWT, async (req, res) => {
    const userId = (req as any).userId;
    console.log("--> Route received userId:", userId); // أضف السطر ده هنا

    if (!userId) {
        return res.status(400).send({ error: "UserId is missing in request" });
    }

    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
});

export default router;