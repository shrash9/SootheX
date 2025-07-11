import express from "express";
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT 

app.get("/",(req,res)=>{
    res.send("Yooo")
})

app.listen(port,()=>{
    console.log(`server is up and running on ${port}`)
})