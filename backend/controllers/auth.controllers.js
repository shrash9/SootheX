import genToken from "../config/token"
import User from "../models/user.model"
import bcrypt from "bcryptjs"

export const signUp = async (req,res)=>{
    try{
        const{name,email,password} = req.body

        const existEmail = await User.findOne({email})
        if(existEmail){
            return res.status(400).json({message:"email already exists!"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({
            name,password:hashedPassword,email
        })

        const token = await genToken(user._id)
        //parse token in cookie
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })

        return res.status(201).json(user)
    }
    catch{
        return res.status(500).json({message:`sign up error ${error}`})
    }
}


export const Login = async (req,res)=>{
    try{
        const{email,password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"no user wih this email!"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }
        const hashedPassword = await bcrypt.hash(password,10)
    
        const token = await genToken(user._id)
        //parse token in cookie
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })

        return res.status(201).json(user)
    }
    catch{
        return res.status(500).json({message:`sign up error ${error}`})
    }
}
