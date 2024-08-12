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