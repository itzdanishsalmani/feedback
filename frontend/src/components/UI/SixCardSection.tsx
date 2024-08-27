export const SixCardSection = () =>{
    return (
        <div className="max-w-[1200px] mx-auto">
        <div className="mt-12 flex flex-col justify-center items-center">
            <div className="text-4xl md:text-5xl md:w-8/12 font-bold text-center ">
            Collect and display testimonials all in one solution
            </div>

            <div>
                {/* Card 1 */}
                <CardWrapperLeftText 
                    text1={"Quick to setup"}
                    text2={"A dedicated landing page"}
                    text3={"Create a dedicated landing page for your business. Share the page link easily via email, social media, or even SMS. Setup can be done in two minutes."}
                    image={"image-1.png"}                 
                />

                {/* Card 2 */}
                <CardWrapperRightText 
                    text1={"Easy to manage"}
                    text2={"A dashboard to manage all testimonials"}
                    text3={"You will have a simple & clean dashboard to manage all testimonials in one place. It's like your email inbox, but it's designed for your social proof!"}
                    image={"image-2.png"}                 
                />

                {/* Card 3 */}
                <CardWrapperLeftText
                    text1={"Track the metrics"}
                    text2={"Understand how video testimonials are performing"}
                    text3={"Track the metrics from all embedded videos, help your marketing team understand the performance at a glance, even promote the best-performing videos to different marketing channels."}
                    text4={"* Available in the Ultimate plan"}
                    text4_css="mt-4"
                    image={"image-3.png"}
                />

                {/* Card 4 */}
                <CardWrapperRightText 
                    text1={"More social proof"}
                    text2={"Not only text and video testimonials"}
                    text3={"If you have testimonials on social media (e.g. Twitter, LinkedIn, TikTok etc), video hosting platforms (e.g. YouTube, Vimeo), and other review sites (e.g. G2, Google, Capterra, Yelp etc), bring them all to your account. Testimonial helps you manage all your social proof in a single place!"}
                    image={"image-4.png"}                 
                />

                {/* Card 5 */}
                <CardWrapperLeftText
                    text1={"Embed the Wall of Love"}
                    text2={"The best testimonials all in one place"}
                    text3={"Treat the Wall of Love as the place to showcase all your favorite testimonials. You can embed it to your website in under a minute. No coding knowledge required!"}
                    text4={"See our Wall of Love in action 👉"}
                    text4_css="mt-4 underline cursor-pointer"
                    image={"image-5.png"}
                />

                {/* Card 6 */}
                <CardWrapperRightText 
                    text1={"Embed a single video testimonial"}
                    text2={"Ad-free hosting for each video"}
                    text3={"For the video testimonial, you can embed it directly on your own website like this 👈. You don't need to use any 3rd-party Ad-free hosting service, e.g. Wistia, Vimeo."}
                    image={"image-6.png"}                 
                />

            </div>
        </div>
    </div>
    )
} 

interface CardText {
    text1: string;
    text2: string;
    text3: string;
    text4?: string;
    text4_css?:string;
    image: string; 
}

const CardWrapperLeftText = ({text1,text2,text3,text4,text4_css,image}:CardText) => {
    return (
        <div className="mt-24 md:px-8 grid md:grid-cols-2 items-center">
            <div className="md:mr-8 mb-4">
                <div className="mt-4 text-xl text-blue-800">{text1}</div>
                <div className="mt-4 text-white text-4xl font-bold">{text2}</div>
                <div className="mt-4 text-lg">{text3}</div>
                <div className={text4_css}>{text4}</div>
                <div><button className="mt-4 p-2 bg-blue-700 rounded-lg">Try it for Free</button></div>
            </div>

            <div className="md:ml-8">
                <div>
                    <img src={image} alt="" width={500} />
                </div>
            </div>
        </div>
    )
}



const CardWrapperRightText = ({text1,text2,text3,text4,text4_css,image}:CardText) => {
    return (
        <div className="mt-24 md:px-8 grid md:grid-cols-2 items-center">
            <div className="md:mr-8 order-last md:order-first">
                <div>
                    <img src={image} alt="" width={500} />
                </div>
            </div>

            <div className="md:ml-8 mb-4">
                <div className="mt-4 text-xl text-blue-800">{text1}</div>
                <div className="mt-4 text-white text-4xl font-bold">{text2}</div>
                <div className="mt-4 text-lg">{text3}</div>
                <div className={text4_css}>{text4}</div>
                <div><button className="mt-4 p-2 bg-blue-700 rounded-lg">Try if for Free</button></div>
            </div>
        </div>
    )
}
