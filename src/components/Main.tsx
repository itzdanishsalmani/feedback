export const Main = () => {
    return (
        <div>
        <div className="mt-24 flex justify-center">
            <div className="text-5xl font-bold text-center w-6/12">
            Get testimonials from your customers with ease
            </div>
            </div>
            <div className="mt-6 flex justify-center">
            <div className="text-xl text-center text-slate-300 w-9/12">
            Collecting testimonials is hard, we get it! So we built Testimonial. In minutes, you can collect text and video testimonials from your customers with no need for a developer or website hosting.
            </div>
            </div>

            <div className="mt-6 flex justify-center space-x-6">
                <button className="border p-2">Try Free Now</button>
                <button className="border p-2">Talk to us</button>
            </div>

            <div className="mt-6 flex justify-center text-slate-300">
                Get started with free credits on us. <p className="underline text-slate-400">See our pricing</p>
            </div>

            <div className="mt-6">
                <video src="video.mp4" controls></video>
            </div>

            <div className="mt-6 text-2xl font-bold flex justify-center text-slate-400">
            Trusted customers
            </div>

            <div className="mt-6 flex flex-col">
                <div className="flex items-center justify-between">
                    <div><img src="mixpanel.png" alt="" width={150} /></div>      
                    <div><img src="kofi.png" alt="" width={150} /></div>          
                    <div><img src="microacquire.svg" alt="" width={150} /></div>  
                    <div><img src="yoast.png" alt="" width={150} /></div>     
                    <div><img src="yotta.png" alt="" width={150} /></div>     
                </div>

                <div className="mt-6 flex items-center justify-between">
                   <div><img src="earnest-capital.svg" alt="" width={150} /></div>
                   <div><img src="rewardful.svg" alt="" width={150} /></div>
                   <div><img src="chime.svg" alt="" width={150} /></div>
                   <div><img src="levels-fyi.svg" alt="" width={150} /></div>
                   <div><img src="chilipiper.png" alt="" width={150} /></div>
                </div>
            </div>

            <div className="my-6 w-auto h-0.1 bg-slate-400 ">
                <hr />
            </div>
        </div>
    )
}