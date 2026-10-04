import cartModel from "../models/cartModel.js";

interface createCartForUser {
        userId: string;
}

const createCartForUser = async ({ userId }: { userId: string }) => {
    const cart = await cartModel.create({
        userId,
        items: [],        // لازم تتأكد إنها مبعوته مصفوفة فاضية
        totalAmount: 0,   // لازم تتأكد إن الرقم مبدئياً صفر
        status: "active"
    });
    return cart;
}
interface GetActiveCartForUser {
    userId: string;
}
export const getActiveCartForUser = async ({userId}: GetActiveCartForUser) => {
    let cart = await cartModel.findOne({userId, status: "active"})
    if(!cart) {
        cart = await createCartForUser ({userId});
    }
    return cart;
}