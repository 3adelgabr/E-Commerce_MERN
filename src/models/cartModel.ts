import mongoose, { Schema, Document } from "mongoose";
import type { ObjectId } from "mongoose"; 
import type { IProduct } from "./productModel.js";

const CartStatusEnum = ["active", "completed"];

export interface ICartItem extends Document {
    product: ObjectId | string | IProduct; 
    unitPrice: number;                 
    quantity: number;
}

export interface ICart extends Document {
    userId: ObjectId | string;
    items: ICartItem[];
    totalAmount: number;                
    status: "active" | "completed";
}

const cartItemsSchema = new Schema<ICartItem> ({
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, 
    quantity: { type: Number, required: true, default: 1 },
    unitPrice: { type: Number, required: true }
});

const cartSchema = new Schema<ICart> ({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemsSchema],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: CartStatusEnum, default: "active" }
});

const cartModel = mongoose.model<ICart>("Cart", cartSchema);

export default cartModel;