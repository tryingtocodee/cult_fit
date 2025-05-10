import { Request, Response } from "express";
import sequelize from "../db/models/sequelize";
import User from "../db/models/userModel";
import jwt from "jsonwebtoken"
import b from "bcryptjs"
import dotenv from "dotenv"
import { setCookie } from "../utils/setCookie";

dotenv.config()

const jwtSecret = process.env.JWT_SECRET


const sigup = async(req : Request , res : Response) => {
    try {
        const {username , email , password } = req.body

        //todo add zod validation 

        const user = await User.findOne(email)

        if(user){
            return res.status(411).json("user already exists")
        }

        if(!jwtSecret){
            console.log("jwt secret not found")
            return res.status(500).json("Internal server error")
        }

        const token = jwt.sign({email} , jwtSecret , {expiresIn : "1h"})

        const hashedPassword = await b.hash(password , 10 )

        setCookie(token , res)

        const newUser = new User({
            username : username,
            email : email ,
            password : hashedPassword,
            type : "user"
        })

        await newUser.save()

        return res.json({
            msg : "user created successfully" ,
            user : {
                id : newUser.id,
                username : newUser.username,
                email : newUser.email,
                type : newUser.type
            }
        })

    } catch (e : any) {
        console.log("error in signup" , e.message)
        return res.status(500).json("Internal server error")
    }
}