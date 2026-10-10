import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.get('authorization');

    if (!authorizationHeader) {
        return res.status(403).send({ error: 'Access token is missing' });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
        return res.status(403).send({ error: "Bearer token not found" });
    }

    jwt.verify(token, process.env.JWT_SECRET || '', async (err, payload) => {
        if (err) {
            return res.status(403).send({ error: "Invalid token" });
        }

        if (!payload) {
            return res.status(403).send({ error: "Invalid token payload" });
        }

        const userPayload = payload as { email: string };

        try {
            const user = await userModel.findOne({ email: userPayload.email });
if (!user) {
    return res.status(403).send({ error: "User not found" });
}

(req as any).userId = user._id;
console.log("--> Middleware userId saved:", user._id); // أضف السطر ده هنا

next(); // كدة تمام، ودّي الطلب للـ Route اللي بعده
        } catch (dbError) {
            return res.status(500).send({ error: "Internal server error" });
        }
    });
};

export default validateJWT;