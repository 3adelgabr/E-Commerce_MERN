import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
const app = express()
const port = 3001;
mongoose
.connect("mongodb://localhost:27017/ecommerce")
.then(() => console.log("Mongo connected"))
.catch((err)=> console.log("Faild to connect", err));

app.use(express.json());
app.use('/user', userRoute)
app.listen(port,() => {
    console.log("server is running at: http://localhost:3001")
})