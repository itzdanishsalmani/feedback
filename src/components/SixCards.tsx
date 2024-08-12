export const SixCards = () =>{
    return (
        <div className="mt-12 flex flex-col justify-center items-center">
            <div className="text-4xl md:text-5xl md:w-8/12 font-bold text-center ">
            Collect and display testimonials all in one solution
            </div>

            <div>
                <CardWrapperLeftText 
                text1={"Quick to setup"}
                text2={"A dedicated landing page"}
                text3={"Create a dedicated landing page for your business. Share the page link easily via email, social media, or even SMS. Setup can be done in two minutes."}
                btn={"Try it for Free"}
                image={"image-1.png"}
                />
            </div>
        </div>
    )
} 

const CardWrapperLeftText = ({text1,text2,text3,btn,image}:any) => {
    return (
        <div className="grid sm:grid-cols-2 items-center">
            <div>
                <div className="mt-4 text-blue-800">{text1}</div>
                <div className="mt-4 text-white text-4xl font-bold">{text2}</div>
                <div className="mt-4">{text3}</div>
                <div><button className="mt-4 p-2 bg-blue-500">{btn}</button></div>
            </div>

            <div>
                <div>
                    <img src={image} alt="" width={500} />
                </div>
            </div>
        </div>
    )
}