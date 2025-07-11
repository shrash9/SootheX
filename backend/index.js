import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
dotenv.config()

const app = express()
const port = process.env.PORT 

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)

app.listen(port,()=>{
    connectDb()
    console.log(`server is up and running on ${port}`)
})