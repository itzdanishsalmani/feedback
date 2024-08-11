export const NavBar = () => {
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

            <div className="block md:hidden">
                <img src="menu.svg" alt="" className="" />
            </div>

            </div>
        </div>
    )
}  