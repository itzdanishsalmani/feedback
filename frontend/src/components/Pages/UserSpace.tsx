import { useState } from "react";
import { BlueButton } from "../UI/Button";
import axios from "axios";
import { useParams } from "react-router-dom";

export function UserSpace() {
  const [showPopup, setShowPopup] = useState<boolean>(false);

    const [review,setReview] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [name,setName] = useState<string>("")
    const { spacename,id } = useParams();

    async function request() {
      const res = await axios.post(`http://localhost:3000/review/${spacename}/${id}`,{
            review:review,
            email:email,
            name:name,
            stars:3
        },{
            withCredentials:true
        })
        if(res.data){
            console.log(res.data)
            alert("send successfully")
        }
    }

  return (
    <div className="bg-black h-screen relative">
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center text-black ">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="text-center">
              <div>
                <img
                  src="logo.svg"
                  alt="logo"
                  width={100}
                  className="mx-auto mb-4"
                />
              </div>
              <div className="font-bold text-xl mb-4">
                Write text testimonial to
              </div>
              <div className="text-left mb-4">
                <div className="font-semibold mb-2">Questions</div>
                <div>{"1. What did you like about the service?"}</div>
              </div>

              <div className="mb-4">
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Write review here"
                  onChange={(e)=>{
                    setReview(e.target.value)
                  }}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Your Name"
                  required
                  onChange={(e)=>{
                    setEmail(e.target.value)
                  }}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Your Email"
                  required
                  onChange={(e)=>{
                    setName(e.target.value)
                  }}
                />
              </div>

              <div className="mt-6">
                <BlueButton text="Send" onClick={request} />
              </div>
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

        <div className="mt-12 font-bold text-4xl">Heading</div>

        <div className="mt-12 text-lg">Description</div>

        <div className="mt-12">
          QUESTION
          <div className="mt-4">1.Questions</div>
        </div>

        <div className="mt-12">
          <BlueButton text="write" onClick={() => setShowPopup(!showPopup)} />
        </div>
      </div>
    </div>
  );
}

