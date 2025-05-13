import { useEffect, useState, type FormEvent } from "react";
import { GenericForm } from "../components/genericForm";
import axios from "axios";

export function CreateGym() {
    const [gymName, setGymName] = useState("")
    const [gymAddress, setGymAddress] = useState("")
    const [openTime, setOpenTime] = useState("")
    const [closeTime, setCloseTime] = useState("")
    const [userId , setUserId] = useState(null)
    //const [image, setImage] = useState<File[]>([])
    const [imageBase64, setImageBase64] = useState<string[]>([])

    //const [video, setVideo] = useState<string[]>([])
    const [videoBase64, setVideoBase64] = useState<string[]>([])
    


    useEffect(() => {
        const user = localStorage.getItem("users")
        if (user) {
            const parsed = JSON.parse(user)
             setUserId(parsed.userId)
        }

    }, [])



    //gym_name, gym_address, open_time, close_time, images, video
    const inputFields = [
        {
            label: "Gym Name",
            placeholder: "add gym name",
            value: gymName,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setGymName(e.target.value),
            type: "text"
        },
        {
            label: "Gym Address",
            placeholder: "add gym address",
            value: gymAddress,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setGymAddress(e.target.value),
            type: "text"
        },
        {
            label: "Open Time",
            placeholder: "add gym open time ",
            value: openTime,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setOpenTime(e.target.value),
            type: "text"
        },
        {
            label: "Close Time ",
            placeholder: "add gym close time ",
            value: closeTime,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setCloseTime(e.target.value),
            type: "text"
        },
        {
            label: "Upload Image ",
            placeholder: "add gym images",
            onChange: handleImageSubmit,
            type: "file"
        },
        {
            label: "Upload Video",
            placeholder: "add gym video",
            onChange: handleVideoSubmit,
            type: "file"
        },
    ]


    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const res = await axios.post("http://localhost:4000/api/v1/center-routes/create",
            { gym_name: gymName, gym_address: gymAddress, close_time: closeTime, open_time: openTime, images: imageBase64, owner : userId },
            { withCredentials: true }
        )
        console.log(res)
    }

    async function handleImageSubmit(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files

        const array_of_files = file ? Array.from(file) : []

        const base64_promise = array_of_files.map(files => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result as string)
                };
                reader.onerror = (error) => reject(error)
                reader.readAsDataURL(files)
            })
        })

        try {
            const base64_results = await Promise.all(base64_promise)
            setImageBase64(prev => [...prev, ...base64_results])
        } catch (error) {
            console.log("errror converting to base64", error)
        }
    }

    async function handleVideoSubmit(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files

        const array_of_video_files = file ? Array.from(file) : []

        if (array_of_video_files.length == 0) return console.log("video file length is 0")

        const base64_promise = array_of_video_files.map(file => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader()

                reader.onload = () => {
                    resolve(reader.result as string)
                }

                reader.onerror = (error) => reject(error)
                reader.readAsDataURL(file)
            })
        })

        try {
            const base64_results = await Promise.all(base64_promise)
            setVideoBase64(prev => [...prev, ...base64_results])
        } catch (error) {
            console.log("error in video uploading", error)
        }

    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <GenericForm title="Login" button_text="Submit" input={inputFields} onSubmit={handleSubmit} />
            <div>
                <h3>Uploaded images </h3>
                <div className="flex flex-row gap-5">
                    {
                        imageBase64.map((src, index) => (
                            <img className="w-96 h-96" src={src} key={index} alt="" />
                        ))
                    }
                </div>
            </div>
            <div>
                <div>uploaded videos</div>
                <div className="flex flex-row gap-5 mt-3">
                    {videoBase64.map((src, index) => (
                        <video className="w-96 h-96" controls src={src} key={index}></video>
                    ))}
                </div>
            </div>
        </div>
    )
}