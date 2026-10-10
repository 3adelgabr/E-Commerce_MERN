import mongoose, { Schema, Document } from "mongoose";
import type { ObjectId } from "mongoose"; 

// 1. واجهة عنصر الطلب الفردي (لا تحتاج لتوريث Document لأنها فرعية)
export interface IOrderItem {
    productTitle: string;
    productImage: string;
    unitPrice: number;
    quantity: number;
}

// 2. واجهة الطلب بالكامل (وراثة Document للتعامل مع طرق Mongoose)
export interface IOrder extends Document {
    orderItems: IOrderItem[];
    total: number;
    address: string;
    userId: ObjectId | string;
}

// 3. Schema عنصر الطلب
const orderItemSchema = new Schema<IOrderItem>({
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

// 4. Schema الطلب الرئيسي
const OrderSchema = new Schema<IOrder>({
    orderItems: [orderItemSchema],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

export const orderModel = mongoose.model<IOrder>("Order", OrderSchema);