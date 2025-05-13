import { Request, Response } from "express";
import Gym from "../db/models/gymModel";
import cloudinary from "../config/cloudinaryConfig";
import Class from "../db/models/classModel";
import Class_Booking from "../db/models/classBookingModel";

interface ImageType {
    imageId: string,
    imageUrl: string
}

export const createCenter = async (req: Request, res: Response): Promise<any> => {
    try {
        const {owner , gym_name, gym_address, open_time, close_time, images, video, dates_open, dates_close } = req.body
        console.log("owner" , owner)
        //todo add zod validateion 
        const gym = await Gym.findOne({ where: { gym_name: gym_name , gym_address: gym_address } })       
        
        if (gym) {
            return res.status(411).json("gym with this name and address already exists")
        }

        const gymAddressTake = await Gym.findOne({ where: { gym_address: gym_address } })

        if (gymAddressTake) {
            return res.status(411).json("This address is already used . cannot added two gyms at same address")
        }

        //frontend gives arrary of bas64 string
        
        const image_response = images.map(async (base64_image : string)=>{

            if(!base64_image){
                return res.status(411).json("invalid image format")
            }
            const uploadImage = await cloudinary.uploader.upload(base64_image)

             if (!uploadImage) {
                 res.status(411).json("add atleast 1 image")
            }
            return {public_id : uploadImage.public_id , secure_url : uploadImage.secure_url}
        })
        
        const uploadedImages = await Promise.all(image_response)

   

        // const video_response = video.map(async(vid : any)=>{
        //     const uploadVideo = await cloudinary.uploader.upload(vid, { resource_type: 'video' })

        //     if(!uploadVideo){
        //         return res.status(411).json("no video found")
        //     }
        // })

        const assets = uploadedImages.map((img)=>({
            imageId : img.public_id ,
            imageUrl : img.secure_url,
            videoId : "",
            videoUrl : ""
        }))

        const newGym = new Gym({
            owner : owner,
            gym_name: gym_name,
            gym_address: gym_address,
            open_time: open_time,
            close_time: close_time,
            assets: assets,
            dates_open: dates_open,
            dates_close: dates_close
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
        const user = req.user

        const gym = await Gym.findOne({ where: { owner: user.id } })

        if (!gym) {
            return res.status(411).json("no gym found")
        }

        return res.json({
            msg: "gym found",
            gym
        })

    } catch (e: any) {
        console.log("error in viewCenter", e.message)
        return res.status(500).json("Internal server error")
    }
}



export const updateCenter = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = req.user

        const { gym_name, gym_address, close_time, open_time, image, video, dated_close, holidays } = req.body

        const gym = await Gym.findOne({ where: { owner: user.id } })

        if (!gym) {
            return res.status(411).json("no gym found . create gym from admin dashboard")
        }

        gym_name ? gym.gym_name = gym_name : gym_name

        gym_address ? gym.gym_address = gym_address : gym_address

        const class_booked = await Class.findOne({ where: { gymId: gym.gymId } })

        if (!class_booked) {
            return res.status(411).json("no class are added for this gym  ")
        }

        if (close_time || open_time) {
            gym.close_time = close_time
            gym.open_time = open_time



            const classId: number[] = []

            for (const active of class_booked.active) {
                if (active.class_end_on > new Date(close_time).getHours()) classId.push(class_booked.classId)
            }

            const check_class = await Class_Booking.findAll({ where: { classBookingId: classId } })

            const confirmed_users_effected: number[] = []
            const waitlist_users_effected: number[] = []

            check_class.forEach(classBooking => {
                confirmed_users_effected.push(...classBooking.confirmed.map((u) => u.userId))
                waitlist_users_effected.push(...classBooking.waitlist.map((u) => u.userId))
            })

            return res.json({
                msg: "users effected by this timing change",
                confirmed_users_effected,
                waitlist_users_effected
            })
        }
      

        // todo add holiday logic . get all the class id that are effected by the new holiday and send email to effected users

        //todo add cloudinary logic . will rcv array of object from client


    } catch (e: any) {
        console.log("error in updateCenter", e.message)
        return res.status(500).json("Internal server error")
    }
}



export const deleteCenter = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = req.user 

        const gym = await Gym.findOne({where : {owner : user.id}})

        if(!gym){
            return res.status(411).json("you didnt create any gym  ")
        }

        const class_online = await Class.findOne({where : {gymId : gym.gymId}})

        if(!class_online){
            await gym.destroy()
            return res.json("gym has been deleted")
        }   

        return res.status(411).json("there booked classes for this gym.")

    } catch (e: any) {
        console.log("error in deleteCenter", e.message)
        return res.status(500).json("Internal server error")
    }
}