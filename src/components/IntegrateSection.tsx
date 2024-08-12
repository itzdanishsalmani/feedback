export const IntegrateSection = () => {
    return (
        <div>
            <div className="mt-56 flex justify-center">
            <div className="text-4xl md:text-5xl md:w-6/12 font-bold text-center ">
            Integrate with any platform
            </div>
            </div>
            <div className="mt-6 md:flex justify-center">
            <div className="text-xl text-center text-slate-300 md:w-9/12">
            We built the ultimate tool for showcasing your satisfied customers. With 3-lines of HTML code, you can embed all your testimonials to any platform!
            </div>
            </div>

            <div className="mt-12">
                <div className="mx-20 grid grid-cols-2 md:grid-cols-4 mt-4 gap-4">

                    <div><ImgCard image={"webflow.png"}/></div>
                    <div><ImgCard image={"shopify.png"}/></div>
                    <div><ImgCard image={"carrd.png"}/></div>
                    <div><ImgCard image={"wordpress.png"}/></div>
                    <div><ImgCard image={"kajabi.svg"}/></div>
                    <div><ImgCard image={"bubble.svg"}/></div>
                    <div><ImgCard image={"framer.png"}/></div>
                    <div><ImgCard image={"squarespace.jpeg"}/></div>

                </div>
            </div>

            <div className="mt-12 underline text-center cursor" >
            ✨ See all 100+ integrations
            </div>

            <div>
                <Card />
            </div>

            <div>
            <div className="mt-36 flex justify-center">
            <div className="text-4xl md:text-5xl md:w-7/12 font-bold text-center ">
            Ready to collect testimonials?
            </div>
            </div>
            <div className="mt-6 md:flex justify-center">
            <div className="text-xl text-center text-slate-300 md:w-8/12">
            We are loved by Fortune 500 companies, early-stage startups, marketing agencies, real estate agents, freelancers, and many more. Your customers' testimonials are the best social proof you can get! Get started now 👇
            </div></div>
            </div>

            <div className="mt-6 flex space-x-12 justify-center">
                <div>No coding skills required</div>
                <div>Start in under 2 minutes</div>
            </div>

            <div className="mt-6 flex space-x-12 justify-center ">
                <div><button className="border">Get started with FREE Credits</button></div>
                <div><button className="border">talk to us</button></div>
            </div>

            <div className="mt-6 underline text-center">
            See our pricing →
            </div>
        </div>
    )
}

const ImgCard = ({image}:any) => {
    return (
        <div>
            <div className="bg-white rounded-lg w-fit flex items-center h-16 px-4 py-2 md:px-12 md:py-4">
                <img src={image} alt="" width={150} />
            </div>
        </div>
    )
}

const Card = () => {
    return (
        <div>
            <div className="mt-56 text-black md:mx-20 bg-yellow-50 w-auto h-auto rounded-lg">
                <div className="pt-16 text-2xl font-bold px-4 md:px-12">
                We embedded Testimonial.to on the last page of our Prehireforms (candidates' skills assessment forms) and candidates' testimonials started coming in automatically! <span className="bg-yellow-100">Testimonials collection is now automated and we don't need to ask customers or candidates to drop us testimonials anymore!</span>
                </div>

                <div className="flex items-center pb-16">
                    <div className="mt-6 px-6">
                        <img src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/testimonials%2F63357365-386c-4ba9-aed5-f4e77ba3a228%2Favatar?alt=media&token=49e40757-1c90-4a48-bf0f-7a25dc85c4d4" alt="" className="rounded-full" width={80} />
                    </div>
                    <div className="text-xl">
                        <div className="font-bold">
                        Kam Ling
                    </div>
                    <div>
                        Co-Founder at Prehireforms.com
                    </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}