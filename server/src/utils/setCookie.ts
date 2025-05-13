import { Response } from "express";

export const setCookie = (token : string , res : Response) => {
    try {
        res.cookie("token" , token , {
            maxAge : 60 * 60 * 1000 ,
            httpOnly : true ,
            sameSite : "strict"
        })
     
    } catch (error) {
        console.log("error in setCookie ")
        return res.status(500).json("Internal server error")      
    }
}