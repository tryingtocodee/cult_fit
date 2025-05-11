import type { FormEvent } from "react"


interface FormProps {
    title: string,
    input: IInput[],
    button_text: string,
    onSubmit: (e : FormEvent) => void
}

interface IInput {
    label: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const defaultStyle = "flex flex-col items-center justify-center w-96 p-8 bg-blue-200 rounded-lg "

const inputStyle = "border border-black focus:outline-none text-gray-500 rounded p-1"



export function GenericForm(props: FormProps) {
    return (
        <form onSubmit={props.onSubmit} className={`${defaultStyle}`}>
            <div className="text-2xl mb-5 text-center font-bold"> {props.title} </div>
            <div>
                {props.input.map((u) => (
                    <div className="mb-3 w-full">
                        <div className="text-lg">{u.label}</div>
                        <input type="text" placeholder={u.placeholder} value={u.value} onChange={u.onChange} className={`${inputStyle}`}/>
                    </div>
                ))}
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-3">{props.button_text}</button>
        </form>
    )
}