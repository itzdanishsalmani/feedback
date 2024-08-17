export function SignUp() {
    return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <div className="w-80 border p-4 rounded-lg">
                    <div className="text-center font-bold text-xl">
                        Sign Up  
                    </div>
                    <div className="mt-4">
                        <input type="text" placeholder="Name" className="w-full rounded-lg text-white border p-2 bg-neutral-900" />
                        <input type="email" placeholder="Email" className="mt-4 w-full rounded-lg text-white border p-2 bg-neutral-900" />
                        <input type="password" placeholder="Password" className="mt-4 w-full rounded-lg text-white border p-2 bg-neutral-900" />
                        <button className="mt-4 border rounded-lg w-full p-2 bg-white text-black font-bold text-lg"onClick={()=>{
                            console.log("Button is clicked")
                        }}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}