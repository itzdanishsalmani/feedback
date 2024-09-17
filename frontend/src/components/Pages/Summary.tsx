import { useEffect } from "react"
import { NavBarOther } from "../UI/NavBarOther"
import { Link } from "react-router-dom"
import axios from "../BaseURL/axios";

export function Summary() {

    useEffect(()=>{

    })

    async function fetchData() {
        await axios.get('',{
            withCredentials:true
        }
        )
    }
    return (
        <div className="bg-neutral-900 h-screen">
        <div className="max-w-[1200px] mx-auto">
            
        <div><NavBarOther /></div>
        <div>
            <div className="mt-4"><img src="logo.svg" alt="" width={100} /></div>
            <div className="mt-4">Spacename</div>
            <div className="mt-4">Space public URL: <Link to={'http://localhost:5173/hello'} className="underline"> http://localhost:5173/hello </Link> </div>
        </div>   

        <div className="grid grid-cols-12 mt-12">
            <div className="grid col-span-4"><Options /></div>
            <div className="grid col-span-8"><Cards /></div>

        </div>
        </div>
        </div>
    )
}

const Cards = () => {
    return (
        <div className="mt-4 text-slate-200 bg-neutral-800 rounded-lg p-4 font-medium">
            
            <div className="flex justify-between items-center">
            <div className="mt-4">Star</div>
            <div className="text-2xl">★</div>
            </div>
            <div className="mt-4">Review</div>
            <div className="mt-4">Name {} </div>
            <div className="mt-4">Email {} </div>
        </div>
    )
}

const Options = () => {
    return (
        <div className="mt-4">
            Wall of Love
        </div>
    )
}