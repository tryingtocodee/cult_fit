import { useState, type FormEvent } from "react";
import { GenericForm } from "../components/genericForm";
import axios from "axios";


export function Login () {
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")


    const inputFields = [
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
        const res = await axios.post("http://localhost:4000/api/v1/user/login" , {email , password} ,  {withCredentials : true })
        // const res = await fetch("http://localhost:4000/api/v1/user/login" , {
        //     method : "POST" ,
        //     headers : {"Content-Type" : "application/json"},
        //     body : JSON.stringify({email , password}),
        //     credentials : "include"
        // })
        console.log(res)
        localStorage.setItem("users" , JSON.stringify(res.data.user) )
    }

    return (
    <div className="flex items-center justify-center h-screen">
        <GenericForm   title="Login" button_text="Submit" input={inputFields} onSubmit={handleSubmit}/>
    </div>
    ) 
}