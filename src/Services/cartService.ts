import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

interface CreateCartForUser {
    userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
    const cart = await cartModel.create({
        userId,
        items: [],        
        totalAmount: 0,   
        status: "active"
    });
    return cart;
}

interface GetActiveCartForUser {
    userId: string;
}

export const getActiveCartForUser = async ({ userId }: GetActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId, status: "active" });
    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return cart;
}

interface AddItemToCart {
    productId: string;
    userId: string;
    quantity: number; 
}

export const addItemToCart = async ({ productId, userId, quantity }: AddItemToCart) => {
    // 1. هات السلة النشطة للمستخدم الأول (لو مش موجودة هتتعمل أوتوماتيك)
    let cart = await getActiveCartForUser({ userId });

    // 2. (هنا هيكمل كود إضافة المنتج أو تعديل الكمية لاحقاً...)
    const existInCart = cart.items.find((p) => p.product.toString() === productId);

    if(existInCart) {
        return { data: "Item alrady exists", statusCode: 400};
    }
    // fetch
    const product = await productModel.findById(productId);
    if(!product){
        return {data: "product not found", statusCode: 400};
    }
    if(product.stock < quantity) {
        return {data: "Low stock for item", statusCode: 400};
    }
    cart.items.push({ 
        product: productId, 
        unitPrice: product.price, 
        quantity: quantity 
    } as any);
    cart.totalAmount += product.price * quantity;

    const updatedCart = await cart.save();
    return { data: updatedCart, statusCose: 200}
    return cart;
}