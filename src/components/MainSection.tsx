export const MainSection = () => {
    return (
        <div>
        <div className="mt-24 flex justify-center">
            <div className="text-4xl md:text-5xl md:w-6/12 font-bold text-center ">
            Get testimonials from your customers with ease
            </div>
            </div>
            <div className="mt-6 md:flex justify-center">
            <div className="text-xl text-center text-slate-300 md:w-9/12">
            Collecting testimonials is hard, we get it! So we built Testimonial. In minutes, you can collect text and video testimonials from your customers with no need for a developer or website hosting.
            </div>
            </div>

            <div className="mt-6 flex md:flex-row justify-center space-x-6">
                <div><button className="border p-2 w-full">Try Free Now</button></div>
                <div><button className="border p-2 w-full">Talk to us</button></div>
            </div>

            <div className="mt-6 text-center text-slate-300">
                Get started with free credits on us. <p className="underline text-slate-400">See our pricing</p>
            </div>

            <div className="mt-6">
                <video src="video.mp4" controls></video>
            </div>

            <div className="mt-6 text-2xl font-bold flex justify-center text-slate-400">
            Trusted customers
            </div>

            <div className="mt-6 px-4">
                <div className="grid grid-cols-2 md:grid-cols-5 items-center md:items-baseline">
                    <div className="w-[100px] md:w-[150px]"><img src="mixpanel.png" alt="" /></div>      
                    <div className="w-[100px] md:w-[150px]"><img src="kofi.png" alt="" /></div>          
                    <div className="w-[100px] md:w-[150px]"><img src="microacquire.svg" alt="" /></div>  
                    <div className="w-[100px] md:w-[150px]"><img src="yoast.png" alt="" /></div>     
                    <div className="w-[100px] md:w-[150px]"><img src="yotta.png" alt="" /></div>     
                
                   <div className="w-[100px] md:w-[150px]"><img src="earnest-capital.svg" alt="" /></div>
                   <div className="w-[100px] md:w-[150px]"><img src="rewardful.svg" alt="" /></div>
                   <div className="w-[100px] md:w-[150px]"><img src="chime.svg" alt="" /></div>
                   <div className="w-[100px] md:w-[150px]"><img src="levels-fyi.svg" alt="" /></div>
                   <div className="w-[100px] md:w-[150px]"><img src="chilipiper.png" alt="" /></div>
                </div>
            </div>
                   

            <div className="mt-12 w-auto h-0.1 bg-slate-400">
                <hr />
            </div>
        </div>
    )
}