import { useState } from "react";
import axios from "axios";
import { BlueButton } from "../UI/Button";

export function CreateSpace() {
  const [spaceName, setSpaceName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");
  const [allQuestions, setAllQuestions] = useState<string[]>([""]);

  // Handle adding a new question input
  function addQuestion() {
    setAllQuestions([...allQuestions, ""]);
  }

  // Handle changing the value of a specific question
  function handleQuestionChange(index: number, value: string) {
    const updatedQuestions = [...allQuestions];
    updatedQuestions[index] = value
    setAllQuestions(updatedQuestions);
  }

  async function handle() {
    const req = await axios
      .post("http://localhost:3000/createspace", {
        userId: 1,
        spacename: spaceName,
        title: title,
        description: customMessage,
        questions: allQuestions, // Sending as an array of objects
      })
      .then((res) => {
        if (res.data.result) {
          alert("Space created successfully!");
        } else {
          alert(res.data.err);
        }
      });
  }

  return (
    <div className="max-w-[1200px] mx-auto text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-5 md:px-12 mt-12 border">
          <div className="flex flex-col items-center">
            <div>image</div>
            <div>{spaceName === "" ? "Space Name" : spaceName}</div>
            <div className="mt-4 text-2xl md:text-3xl font-bold">
              {title === "" ? "Header Goes here" : title}
            </div>
            <div className="mt-4">
              {customMessage === ""
                ? "Custom message goes here"
                : customMessage}
            </div>

            <div className="mt-4">
              <div>Questions comes here</div>
              {allQuestions.map((question, index) => (
                <div key={index}>{question}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 w-10/12 mx-auto">
          <div className="flex flex-col items-center">
            <div className="mt-12 font-bold text-2xl md:text-3xl text-black ">
              Create a new Space
            </div>

            <div className="mt-8 ">
              After the Space is created, it will generate a dedicated page for
              collecting testimonials.
            </div>
          </div>

          <div className="mt-12">
            <div>Space name</div>
            <input
              type="text"
              placeholder="Space name"
              className="border"
              onChange={(e) => setSpaceName(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <div>Space logo</div>
            <div>
              <button className="border">Upload</button>
            </div>
          </div>

          <div className="mt-4">
            <div>Header Title</div>
            <input
              type="text"
              placeholder="Title"
              className="border"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <div>Custom Message</div>
            <textarea
              placeholder="Type the custom message that you required"
              className="border"
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
                onChange={(e) => handleQuestionChange(index, e.target.value)}
              /></div>
            ))}
            <button className="mt-2 border p-2" onClick={addQuestion}>
              Add Question
            </button>
          </div>

          <div className="mt-4">
            <BlueButton text="Create new space" onClick={handle} />
          </div>
        </div>
      </div>
    </div>
  );
}
