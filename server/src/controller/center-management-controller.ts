import { Request, Response } from "express";
import Gym from "../db/models/gymModel";
import cloudinary from "../config/cloudinaryConfig";

export const createCenter = async (req: Request, res: Response): Promise<any> => {
    try {
        const { gym_name, gym_address, open_time, close_time, images, video } = req.body

        //todo add zod validateion 

        const gym = await Gym.findOne({ where: { gym_name: gym_name, gym_address: gym_address } })

        const gymAddressTake = await Gym.findOne({ where: { gym_address: gym_address } })

        if (gym) {
            return res.status(411).json("gym with this name and address already exists")
        }

        if (gymAddressTake) {
            return res.status(411).json("This address is already used . cannot added two gyms at same address")
        }

        const uploadImage = await cloudinary.uploader.upload(images)

        if (!uploadImage) {
            return res.status(411).json("add atleast 1 image")
        }

        const uploadVideo = await cloudinary.uploader.upload(video, { resource_type: 'video' })



        const assets = [
            {
                imageId: uploadImage.public_id,
                imageUrl: uploadImage.secure_url,
                videoId: uploadVideo.public_id,
                videoUrl: uploadVideo.secure_url
            }
        ]

        const newGym = new Gym({
            gym_name: gym_name,
            gym_address: gym_address,
            open_time: open_time,
            close_time: close_time,
            assets: assets
        })

        await newGym.save()

        return res.json({
            msg: "new gym created",
            newGym
        })


    } catch (e: any) {
        console.log("error in createCenter", e.message)
        return res.status(500).json("Internal server error")
    }
}


export const viewCenter = async (req: Request, res: Response): Promise<any> => {
    try {

    } catch (e: any) {
        console.log("error in viewCenter", e.message)
        return res.status(500).json("Internal server error")
    }
}



export const updateCenter = async (req: Request, res: Response): Promise<any> => {
    try {

    } catch (e: any) {
        console.log("error in updateCenter", e.message)
        return res.status(500).json("Internal server error")
    }
}



export const deleteCenter = async (req: Request, res: Response): Promise<any> => {
    try {

    } catch (e: any) {
        console.log("error in deleteCenter", e.message)
        return res.status(500).json("Internal server error")
    }
}