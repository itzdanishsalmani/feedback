import { useState } from "react"

export const NavBar = () => {
    const [isPhoneView,setPhoneView] = useState(false)
    return (
        <div>
        <div className="flex justify-between items-center ">
            <div>
            <img src="/logo.svg" alt="" width={150} />
            </div>

            <div className="hidden md:flex flex-row space-x-8 ">
                <div>Customers</div>
                <div>Features</div>
                <div>Integrations</div>
                <div>Pricing</div>
            </div>

            <div className="hidden md:flex flex-row space-x-8">
                <div>Sign in</div>
                <div>Sign up</div>
            </div>

            <div className="block md:hidden" onClick={()=>{
                setPhoneView(!isPhoneView)
            }} >
                <img src="menu.svg" alt="" />
            </div>
            </div>

            { isPhoneView && (
            <div className="px-4 mt-4 border-b border-neutral-800 md:hidden space-y-2">
                <div>Customers</div>
                <div>Features</div>
                <div>Integrations</div>
                <div>Pricing</div>
            </div>
    )}
            
        </div>
    )
}  