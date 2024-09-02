import axios from "axios"
import { useState } from "react"

export function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handle() {
        if (name === "" || email === "" || password === "") {
            alert("Fields cannot be empty")
            return
        }
        else {
            const res = await axios.post("/", {
                name,
                email,
                password
            })
            if (res.data) {
                alert("Sign up successfully")
            } else {
                alert("Something error")
            }
        }
    }

    return (
        <div className="bg-black">
            <div className="flex justify-center items-center h-screen">
                <div className="w-96 p-4 rounded-lg">
                    <div className="text-center font-bold text-xl">
                        Create an account
                    </div>
                    <div className="mt-4 text-center">
                        Enter your email below to create an account
                    </div>
                    <div className="mt-4">
                        <input type="text"
                            placeholder="John doe"
                            className="w-full rounded-lg text-white border p-2 bg-black"
                            onChange={(e) => {
                                setName(e.target.value)
                            }} />
                        <input type="email"
                            placeholder="johndoe@example.com"
                            className="mt-4 w-full rounded-lg text-white border p-2 bg-black"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                        <input type="password"
                            placeholder="password"
                            className="mt-4 w-full rounded-lg text-white border p-2 bg-black"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                        <button
                            className="mt-4 border rounded-lg w-full p-2 bg-white text-black font-bold text-lg"
                            onClick={handle}>Sign up</button>
                        <div className="mt-4 text-center">
                            By clicking on Continue, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy policy.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}