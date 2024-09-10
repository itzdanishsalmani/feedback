import { useState } from "react";
import { BlueButton } from "../UI/Button";

export function UserSpace() {
    const [showPopup,setShowPopup] = useState<boolean>(false)

    return (
        <div className="bg-black h-screen">

            {showPopup && (
                <div className="absolute bg-blue-700 w-6/12">
                     <div className=" h-screen ">
                    <div><img src="logo.svg" alt="" width={100} /></div>
                    <div>Write text testimonial to</div>
                    <div>
                        Questions
                        <div>
                            1.
                        </div>
                    </div>

                    <div>
                        stars
                    </div>

                    <div>
                        <textarea placeholder="write review here" />
                    </div>

                    <div>
                        <input type="text" placeholder="Your Name" />
                    </div>
                    
                    <div>    
                        <input type="text" placeholder="Your Email" />
                    </div>

                    <div>
                        <BlueButton text="Send" onClick={()=>(console.log("send"))} />
                    </div>
                    </div>
                </div>
            )}

            <div className=" pt-12 pl-12">
                    <img src="logo.svg" alt="" width={200} />
            </div>

            <div className="text-center">
                <div className="flex justify-center">
                    <img src="logo.svg" alt="" width={150} />
                </div>

                <div className="mt-12 font-bold text-4xl">
                    Heading
                </div>

                <div className="mt-12 text-lg">
                    Description
                </div>

                <div className="mt-12">
                    QUESTION
                    <div className="mt-4">
                        1.Questions
                    </div>
                </div>
                
                <div className="mt-12">
                    <BlueButton text="write" 
                    onClick={()=>setShowPopup(!showPopup)}/>
                </div>
            </div>

            

        </div>
    )
}