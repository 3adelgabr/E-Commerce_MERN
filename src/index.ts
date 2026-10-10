import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import productRoute from "./routes/productRoute.js";
import { seedInitialProducts } from "./Services/productService.js";
import cartRoute from "./routes/cartRoute.js";

dotenv.config();
const app = express();
const port = 3001;

app.use(express.json());

mongoose
.connect(process.env.DATABASE_URL || '')
.then(() => {
    console.log("Mongo connected");
    seedInitialProducts();
})
.catch((err) => console.log("Failed to connect", err));

// 3. الـ Routes
app.use('/user', userRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);


app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});