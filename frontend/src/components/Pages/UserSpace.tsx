import axios from "../BaseURL/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RatingReview } from "../Utils/RatingReview";
import { toast } from "react-toastify";
import { ImageEffect } from "../Utils/ImageEffect";
import { NavBarOther } from "../UI/NavBarOther";
import { BlueButton } from "../Utils/Button";

export function UserSpace() {
  const [rating, setRating] = useState<number>(0);
  const { spacename } = useParams();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [spaceNotFound, setSpaceNotFound] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string>("");

  const [showGlass, setShowGlass] = useState<boolean>(false);
  
  useEffect(() => {
    async function urlCheck() {
      try {
        const res = await axios.get(`/userspace/${spacename}`);
        console.log(res.data);
        if (res.data) {
          setTitle(res.data.userWithSpacename.title);
          setDescription(res.data.userWithSpacename.description);
          setQuestions(res.data.userWithSpacename.questions);

          const profileImage = `https://testimonial-backend-8ylm.onrender.com/${res.data.userWithSpacename.profileImage}`;

          setProfileImage(profileImage)
        }
        if (res.data.error) {
          setSpaceNotFound(false);
        }
      } catch (error) {
        console.error("API call failed:", error);
        setSpaceNotFound(false);
      }
    }

    urlCheck();
  }, [spacename]);

  async function sendReview() {
    try {

      if( review==="" || email === "" || name ==="" ){
        return toast("Fields cannot be empty")
      }

      const res = await axios.post(
        `/createreview`,
        {
          review: review,
          email: email,
          name: name,
          stars: rating,
          spacename: spacename,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (res.data.message) {
        console.log(res.data);
        toast(res.data.message);
        setShowGlass(true);
      } else if(res.data.error){
        toast(res.data.error);
      }
    } catch (error) {
      toast("error while sending");
    }
  }

  if (spaceNotFound) {
    return (
      <div className="bg-neutral-900 h-screen flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold">PAGE NOT FOUND</h1>
      </div>
    );
  }

  return (

    <div> 

   {/* Thankyou Image */}

   {showGlass ? (
    <div>
     <ImageEffect 
        text1="Thank you!"
        text2="Thank you so much for your shoutout!"
        text3="It means a tons of us!"
        onClick={()=>{setShowGlass(false),
          setShowPopup(false)}}
        />
    </div>

   ):(
    <div className="bg-neutral-900 h-screen relative">

      {/* Input from user page */}

      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center text-black">
          <div className="bg-white p-8 rounded-lg shadow-lg w-4/12">
            <div
              className="flex justify-end cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              <img src="close.svg" alt="close" />
            </div>
            <div className="text-center">
              <div>
                <img
                  src="logo.png"
                  alt="logo"
                  width={100}
                  className="mx-auto mb-4"
                />
              </div>

              <div className="font-bold text-xl mb-4">
                Write text testimonial to {title}
              </div>

              <div className="text-left mb-4">
                <div className="font-semibold mb-2">Questions</div>
                {questions.map((each, index) => (
                  <div key={index}>
                    {index + 1}. {each}{" "}
                  </div>
                ))}{" "}
              </div>

              <div className="mt-4 text-left cursor-pointer">
                <RatingReview rating={rating} setRating={setRating} />
              </div>

              <div className="mb-4">
                <textarea
                  className="w-full h-24 p-2 border rounded-lg"
                  placeholder="Write review here"
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Your Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Your Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="mt-6">

                <BlueButton 
                text="Send"
                onClick={sendReview}/>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main page */}

      <div>
<NavBarOther/>
      </div>

      <div className="text-center">
        <div className="flex justify-center">
          <img src={profileImage} alt="" width={150} />
        </div>

        <div className="mt-12 font-bold text-4xl">{title}</div>

        <div className="mt-12 text-lg">{description}</div>

        <div className="mt-12">
          QUESTION
          <div className="mt-4">
            {questions.map((each, index) => (
              <div key={index}>
                {index + 1}. {each}{" "}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <BlueButton 
          text="write"
          onClick={() => setShowPopup(!showPopup)}/>
        </div>
      </div>
    </div>
   )}

    </div>

  );
}
