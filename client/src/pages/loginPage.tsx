import { useState, type FormEvent } from "react";
import { GenericForm } from "../components/genericForm";

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
    function handleSubmit(e : FormEvent) {
        e.preventDefault()
    }

    return (
    <div className="flex items-center justify-center h-screen">
        <GenericForm   title="Login" button_text="Submit" input={inputFields} onSubmit={handleSubmit}/>
    </div>
    ) 
}