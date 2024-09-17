import { useEffect, useState } from "react";
import { BlueButton } from "../UI/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { RatingReview } from "../Utils/RatingReview";

export function UserSpace() {
  const [rating, setRating] = useState(0)
  const { spacename } = useParams();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [spaceNotFound, setSpaceNotFound] = useState<boolean>(false);

  useEffect(() => {
    async function check() {
      try {
        const res = await axios.get(
          `http://localhost:3000/publicspacename/${spacename}`
        );
        if (res.data.error) {
          setSpaceNotFound(true); 
        }
      } catch (error) {
        console.error("API call failed:", error);
        setSpaceNotFound(false); 
      }
    }

    check();
  }, [spacename]);

  async function request() {
    const res = await axios.post(
      `http://localhost:3000/review`,
      {
        review: review,
        email: email,
        name: name,
        stars: rating,
        spacename: spacename,
      },
      {
        withCredentials: true,  
      }
    );
    if (res.data) {
      console.log(res.data);
      alert("send successfully");
    }
  }
    console.log(rating)
  if (spaceNotFound) {
    return (
      <div className="bg-neutral-900 h-screen flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold">PAGE NOT FOUND</h1>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 h-screen relative">
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center text-black">
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

              <div className="mt-4">
                <RatingReview rating={rating} setRating={setRating} />
              </div>

              <div className="text-left mb-4">
                <div className="font-semibold mb-2">Questions</div>
                <div>{"1. What did you like about the service?"}</div>
              </div>

              <div className="mb-4">
                <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Write review here"
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Your Name"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Your Email"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
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
