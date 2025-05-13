import {create} from "zustand"
import axios from "axios"


interface CreatGym {
    gym_name : string ,
    gym_address : string , 
    open_time : string, 
    close_time : string, 
    images : Image[], 
    video : Video[], 
    dates_open : Date_Open[] , 
    dates_close : Date_Close[] 
}

interface Image {
    base64_image : string
}

interface Video {
    base64_video : string
}

interface Date_Open {
    dates_open : Date
}
interface Date_Close {
    dates_close : Date
}


interface IUser {
    username : string ,
    email : string,
    password : string
}

const userStore = create((set) =({
    user : null ,
    loading : false, 

    signup : async({username , email , password} : IUser)=> {
        const res = await axios.post("http://localhost:4000/api/v1/user/signup" , 
            {username , email , password} ,
            {headers : {withCredentials : true}}
        ) 
        console.log(res)
    },

    create_gym : async({ gym_name, gym_address, open_time, close_time, images,
                         video, dates_open, dates_close } : CreatGym) => {
                            
        const res = await axios.post( "http://localhost:4000/api/v1/center-routes/create-gym" ,
                    { gym_name  , gym_address, open_time,    close_time, images, video, dates_open, dates_close }, 
                    {headers : {withCredentials : true}})
            console.log(res)

    }

}))