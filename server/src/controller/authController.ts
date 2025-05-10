import { Request, Response } from "express";
import sequelize from "../db/models/sequelize";
import User from "../db/models/userModel";
import jwt from "jsonwebtoken"
import b, { hash } from "bcryptjs"
import dotenv from "dotenv"
import { setCookie } from "../utils/setCookie";
import { where } from "sequelize";

dotenv.config()

const jwtSecret = process.env.JWT_SECRET


export const signup = async(req : Request , res : Response) :Promise<any> => {
    try {
        const {username , email , password } = req.body

        //todo add zod validation 

        const user = await User.findOne({where : {email : email}})

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
        //todo send verification email on signup 

    } catch (e : any) {
        console.log("error in signup" , e.message)
        return res.status(500).json("Internal server error")
    }
}

export const login = async(req : Request , res : Response) : Promise<any> => {
    try {
        const {email , password} = req.body
        //todo add zod validation 

        const user = await User.findOne({where: {email : email}})

        if(!user){
            return res.status(411).json("No email found with this username ")
        }

        if(!jwtSecret){
            console.log("jwt secret not found ")
            return res.status(500).json("Internal server error")
        }

        const token = jwt.sign({email} , jwtSecret ,{expiresIn : "1h"})

        const verifyPassword = await b.compare(password , user.password)

        if(!verifyPassword){
            return res.status(411).json("incorrect password")
        }

        setCookie(token , res)

        return res.json({
            msg : "logged in successfully",
            user : {
                userId : user.id ,
                username : user.username ,
                email : user.email ,
                type : user.type ,

            }
        })

    } catch (e : any) {
        console.log("error in login" , e.message)
        return res.status(500).json("Internal server error")
    }
}



export const updateUser = async(req : Request , res : Response) : Promise<any> => {
    try {
        const userId = req.user.id

        if(!userId){
            return res.status(411).json("incorrect userId")
        }

        const {username , email , password } = req.body

        //todo add update for all other fields as well 
        const user = await User.findByPk(userId)

        if(!user){
            return res.status(411).json(" userid not found ")
        }

        if(username) user.username = username

        if(email) user.email = email 

        if(password){
            const hashedPassword = await b.hash(password , 10)
            user.password = hashedPassword
        }

        await user.save()

        return res.json({
            msg : "user updated successfully" ,
            user : {
                username : user.username ,
                email : user.email
            }
        })

    } catch (e : any) {
        console.log("error in updateUser" , e.message)
        return res.status(500).json("Internal server error")
    }
}



export const deleteUser = async(req : Request , res : Response) : Promise<any> => {
    try {
        const userId = req.user.id 

        if(!userId){
            return res.status(411).json("userId not found  ")
        }

        const user = await User.findByPk(userId)

        if(user){
            await user.destroy()
            res.clearCookie("token")
            return res.json("User delete successfully ")
        }else {
            return res.status(411).json("no user")
        }
    } catch (e : any) {
        console.log("error in deleteUser" , e.message)
        return res.status(500).json("Internal server error")
    }
}



export const getUser = async(req : Request , res : Response) : Promise<any> => {
    try {
        const userId = req.user.id

        if(!userId){
            return res.status(411).json("Userid not found ")
        }

        const user = await User.findByPk(userId)

        if(!user){
            return res.status(411).json("no user found with this id ")
        }

        return res.json({
            msg : "user found",
            user
        })

    } catch (e : any) {
        console.log("error in getUser" , e.message)
        return res.status(500).json("Internal server error")
    }
}