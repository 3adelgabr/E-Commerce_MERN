import cartModel, { type ICart } from "../models/cartModel.js";
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

interface ClearCart {
    userId: string;
}
export const clearCart = async ({userId}: ClearCart) => {
    const cart = await getActiveCartForUser ({userId})

    cart.items = []
    cart.totalAmount = 0

    const updatedCart = await cart.save()
    return {data: updatedCart, statusCode:200}
}


// دالة مساعدة لحساب إجمالي السلة (مع إمكانية استبعاد منتج معين)
const caclulateCartTotalItems = ({ cart, productId }: { cart: ICart; productId?: string }) => {
    const itemsToCalculate = productId 
        ? cart.items.filter((p) => p.product.toString() !== productId) 
        : cart.items;

    const total = itemsToCalculate.reduce((sum, product) => {
        return sum + (product.quantity * product.unitPrice);
    }, 0);

    return total;
}

interface AddItemToCart {
    productId: string;
    userId: string;
    quantity: number; 
}

export const addItemToCart = async ({ productId, userId, quantity }: AddItemToCart) => {
    let cart = await getActiveCartForUser({ userId });

    const existInCart = cart.items.find((p) => p.product.toString() === productId);

    if (existInCart) {
        return { data: "Item already exists", statusCode: 400 };
    }

    const product = await productModel.findById(productId);
    if (!product) {
        return { data: "product not found", statusCode: 400 };
    }
    if (product.stock < quantity) {
        return { data: "Low stock for item", statusCode: 400 };
    }

    cart.items.push({ 
        product: productId, 
        unitPrice: product.price, 
        quantity: quantity 
    } as any);

    // استخدام الدالة المساعدة لحساب الإجمالي الجديد
    cart.totalAmount = caclulateCartTotalItems({ cart });

    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 }; // تم تصحيح statusCose إلى statusCode
}

interface UpdateItemInCart {
    productId: any;
    userId: string;
    quantity: number; 
}

export const updateItemInCart = async ({
    productId,
    quantity,
    userId,
}: UpdateItemInCart) => {
    const cart = await getActiveCartForUser({ userId });
    const existInCart = cart.items.find((p) => p.product.toString() === productId);
    
    if (!existInCart) {
        return { data: "Item does not exist in cart", statusCode: 400 };
    }
    
    existInCart.quantity = quantity;
    
    // استخدام الدالة المساعدة لحساب الإجمالي
    cart.totalAmount = caclulateCartTotalItems({ cart });

    const updatedCart = await cart.save();
    return { data: updatedCart, statusCode: 200 };
};

interface DeleteItemInCart {
    productId: any;
    userId: string;
}

export const deleteItemInCart = async ({ userId, productId }: DeleteItemInCart) => {
    const cart = await getActiveCartForUser({ userId });
    
    const existInCart = cart.items.find((p) => p.product.toString() === productId);

    if (!existInCart) {
        return { data: "Item does not exist in cart", statusCode: 400 };
    }

    // 1. حساب الإجمالي الجديد بعد استبعاد المنتج المراد حذفه
    cart.totalAmount = caclulateCartTotalItems({ cart, productId });

    // 2. تصفية العناصر وحذف المنتج من المصفوفة
    const otherCartItems = cart.items.filter((p) => p.product.toString() !== productId);
    cart.items = otherCartItems as any;

    // 3. احفظ التعديلات
    const updatedCart = await cart.save();
    
    return { data: updatedCart, statusCode: 200 };
}