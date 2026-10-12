import productModel from "../models/productModel.js";

export const getAllProducts = async () => {
    return await productModel.find();
}

export const seedInitialProducts = async () => {

    try {
    // عرفنا المصفوفة بره عشان تكون مرئية لكل الدالة
    const products = [
        {
            title: "Wireless Noise-Canceling Headphones", 
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60", 
            price: 149.99, 
            stock: 100
        },
        {
            title: "Ergonomic Mechanical Keyboard", 
            image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60", 
            price: 89.99, 
            stock: 30
        },
        {
            title: "Minimalist Leather Backpack", 
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60", 
            price: 65.00, 
            stock: 25
        },
        {
            title: "Smart Fitness Watch", 
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60", 
            price: 199.99, 
            stock: 66
        },
        {
            title: "Classic Stainless Steel Watch", 
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=60", 
            price: 120.50, 
            stock: 86
        },
        {
            title: "Professional DSLR Camera", 
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60", 
            price: 850.00, 
            stock: 23
        },
        {
            title: "Modern Ceramic Coffee Mug", 
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60", 
            price: 18.99, 
            stock: 25
        },
        {
            title: "Running Sports Sneakers", 
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60", 
            price: 75.00, 
            stock: 66
        },
        {
            title: "Portable Bluetooth Speaker", 
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60", 
            price: 45.00, 
            stock: 86
        },
        {
            title: "Designer Sunglasses", 
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60", 
            price: 95.00, 
            stock: 23
        },
    ];

        const existingProducts = await getAllProducts();
        if (existingProducts.length === 0) {
            await productModel.insertMany(products);
            console.log("Initial products seeded successfully!");
        }
    } catch (err: any) {
        console.error("Cannot seed DB", err.message);
    }
};