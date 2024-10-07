import { useState } from "react";
import { BlueButton } from "../Utils/Button";
import axios from "../BaseURL/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ImageEffect } from "../Utils/ImageEffect";

export function CreateSpace() {
  const [spaceName, setSpaceName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");
  const [allQuestions, setAllQuestions] = useState<string[]>([""]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showGlass, setShowGlass] = useState<boolean>(false);

  const navigate = useNavigate();

  // Handle adding a new question input
  function addQuestion() {
    if (allQuestions.length < 3) {
      setAllQuestions([...allQuestions, ""]);
    } else {
      toast("max count is 3");
    }
  }

  // Handle changing the value of a specific question
  function handleQuestionChange(index: number, value: string) {
    const updatedQuestions = [...allQuestions];
    updatedQuestions[index] = value;
    setAllQuestions(updatedQuestions);
  }

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("spacename", spaceName);
      formData.append("title", title);
      formData.append("description", customMessage);
      formData.append("questions", JSON.stringify(allQuestions));

      if (profileImage) {
        formData.append("profileImage", profileImage); 
      }

      const res = await axios.post("/createspace", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);

      if (res.data.message) {
        toast(res.data.message);
        setShowGlass(true);
      } else {
        toast(res.data.error);
      }
    } catch (error: any) {
  console.error("Error:", error.response ? error.response.data : error.message);
  toast(error.response ? error.response.data.message : error.message);
}
  }

  return (
    // display thanks gif, when clicked on createspace
    <div>
      {showGlass ? (
        <ImageEffect
          text1="Thank you!"
          text2="Your Space is created!"
          text3="Take reviews and use in your website!"
          onClick={() => navigate("/summary")}
        />
      ) : (
        //main page renders

        <div className=" max-w-[1200px] mx-auto text-gray-800 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-12 p-4">
            <div className="preview col-span-5 md:px-12 mt-12 border rounded-lg h-fit pb-12 w-full">
              <div className="flex flex-col items-center">
                <div className="text-green-600 bg-green-200 rounded-full px-2 font-semibold">
                  Live preview - Testimonial Page
                </div>
                <div className="mt-12">
                  <img src="logo.png" alt="" width={100} className="" />
                </div>
                <div className="mt-4 text-2xl md:text-3xl font-bold text-gray-600">
                  {title === "" ? "Header goes here..." : title}
                </div>
                <div className="mt-4 bold text-gray-500">
                  {customMessage === ""
                    ? "Your custom message goes here..."
                    : customMessage}
                </div>

                <div className="mt-4">
                  <div>QUESTIONS</div>
                  <div className="text-gray-500">
                    {allQuestions.map((question, index) => (
                      <div key={index}>{question}</div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 w-full">
                  <button className="border p-2 w-full bg-blue-600 text-lg rounded-lg text-white">
                    Send in text
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-7 w-10/12 mx-auto">
              <div className="flex flex-col items-center">
                <div className="mt-12 font-bold text-2xl md:text-3xl text-black">
                  Create a new Space
                </div>

                <div className="mt-8 text-center">
                  After the Space is created, it will generate a dedicated page
                  for collecting testimonials.
                </div>
              </div>

              <div className="mt-12">
                <div>Space name</div>
                <input
                  type="text"
                  placeholder="Space name"
                  className="border w-full rounded-lg p-2"
                  onChange={(e) => setSpaceName(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <div>Space logo</div>
                <div>
                  <button className="border">Upload</button>
                  <input
                    type="file"
                    accept="image/*" // Optional: restrict file types
                    onChange={(e) =>
                      setProfileImage(e.target.files ? e.target.files[0] : null)
                    } // Use single file
                  />
                </div>
              </div>

              <div className="mt-4">
                <div>Header Title</div>
                <input
                  type="text"
                  placeholder="Would you like to give a shoutout for xyz?"
                  className="border w-full rounded-lg p-2"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <div>Your custom message</div>
                <textarea
                  placeholder="Write a warm message to your customer,and give them simple directions on how to make the best testimonial."
                  className="border w-full rounded-lg p-2 h-24"
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <div>Questions</div>
                {allQuestions.map((question, index) => (
                  <div className="mt-2">
                    <input
                      key={index}
                      type="text"
                      placeholder={`Question ${index + 1}`}
                      className="border mt-2"
                      value={question}
                      onChange={(e) =>
                        handleQuestionChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}

                <button className="mt-2 border p-2" onClick={addQuestion}>
                  Add Question
                </button>
              </div>

              <div className="mt-4 flex justify-center">
                <BlueButton text="Create new space" onClick={handle} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
