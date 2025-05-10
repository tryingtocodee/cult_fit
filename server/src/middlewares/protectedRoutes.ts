import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../db/models/userModel";

dotenv.config()

const jwtSecret = process.env.JWT_SECRET

interface IUser {
    id : number ,
    username : string,
    email : string ,
}

declare global {
    namespace Express {
        interface Request {
            user : IUser 
        }
    }
}

export const protectedRoutes = async(req : Request , res : Response , next : NextFunction) : Promise<any> => {
    try {
        const token = req.cookies.token

        if(!token){
            return res.status(411).json("no token found")
        }

        if(!jwtSecret){
            console.log("jwt secrete not found ")
            return res.status(500).json("Internal server error")
        }

        const decode = jwt.verify(token , jwtSecret) as JwtPayload

        const user = await User.findOne({where : {email : decode.email}})

        req.user = user as IUser

        next()

    } catch (e : any) {
        console.log("error in protected routers" , e.message)
        return res.status(500).json("Internal server error ")
    }
}