import { useState, type FormEvent } from "react";
import { GenericForm } from "../components/genericForm";
import axios from "axios"

export function Signup () {
    const [username , setUsername] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")


    const inputFields = [
        {
            label : "Username",
            placeholder : "add username" ,
            value : username ,
            onChange : (e : React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value),
            type : "text"
        },
         {
            label : "Email",
            placeholder : "add email" ,
            value : email ,
            onChange : (e : React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value),
            type : "text"
        },
         {
            label : "Password",
            placeholder : "add password" ,
            value : password ,
            onChange : (e : React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value),
            type : "text"
        },
    ]
    async function handleSubmit(e : FormEvent) {
        e.preventDefault()
        const res = await axios.post("http://localhost:4000/api/v1/user/signup" , 
            {username , email , password},
            {withCredentials : true}
        )
        localStorage.setItem("users" , JSON.stringify(res.data.user))
    }

    return (
    <div className="flex items-center justify-center h-screen">
        <GenericForm  title="Signup" button_text="Submit" input={inputFields} onSubmit={handleSubmit}/>
    </div>
    ) 
}