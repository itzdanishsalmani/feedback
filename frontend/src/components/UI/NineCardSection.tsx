export const NineCardSection = () => {
    return (
        <div className="max-w-[1200px] mx-auto">
        <div className="mt-12 flex flex-col justify-center items-center">
            <div className="text-4xl md:text-5xl md:w-8/12 font-bold text-center ">
                Add testimonials to your website with no coding!
            </div>
            <div className="mt-12 text-xl text-center text-slate-300 md:w-9/12">
            Copy and paste our HTML code to add the Wall Of Love (👉 full version) to your website. We support any no-code platform (Webflow, WordPress, you name it!)
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 space-x-2 space-y-2">
                <div><img src="img1.png" alt="" width={350} className="rounded-lg" /></div>
                <div><img src="img2.png" alt="" width={350} className="rounded-lg" /></div>
                <div><img src="img3.png" alt="" width={350} className="rounded-lg" /></div>
                <div><img src="img4.png" alt="" width={350} className="rounded-lg" /></div>
                <div><img src="img5.png" alt="" width={350} className="rounded-lg" /></div>
                <div><img src="img6.png" alt="" width={350} className="rounded-lg" /></div>
                <div><img src="img7.png" alt="" width={350} className="rounded-lg" /></div>
                <div><img src="img8.png" alt="" width={350} className="rounded-lg" /></div>
                <div><img src="img9.png" alt="" width={350} className="rounded-lg" /></div>
            </div>

            <div className="mt-6 md:mt-12">
                <img src="logo.svg" alt="" width={200} />
            </div>

            <div className="mt-12 h-0.1 w-full bg-slate-400 border">
                <hr />
            </div>
        </div>
        </div>
    )
}