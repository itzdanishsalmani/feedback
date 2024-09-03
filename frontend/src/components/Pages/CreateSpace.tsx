import { useState } from "react"

export function CreateSpace() {

    const [spaceName, setSpaceName] = useState<string>("")
    const [title, setTile] = useState<string>("")
    const [customMessage, setCustomMessage] = useState<string>("")

    const [allQuestions, setAllQuestions] = useState<any>({
        question1: "Question 1",
        question2: "Question 2",
        question3: "Question 3"
    })

    return (
        <div className="max-w-[1200px] mx-auto text-gray-800">
            <div className="grid grid-cols-12">
                <div className="col-span-5 px-12 mt-12 border">
                    <div className="flex flex-col items-center">
                        <div>
                            image
                        </div>
                        <div>{spaceName===''? "Space Name":spaceName
                            }</div>
                        <div className="mt-4 text-3xl font-bold">
                            {title === ''? "Header Goes here" : title}
                            
                        </div>
                        <div className="mt-4 ">
                            {customMessage===''? "Custom message goes here" : customMessage}
                        </div>

                        <div className="mt-4">
                            Questions comes here

                            <div>{allQuestions.question1 === ''? allQuestions.question1 : allQuestions.question1}</div>
                            <div>{allQuestions.question2 === ''? allQuestions.question1 : allQuestions.question2}</div>
                            <div>{allQuestions.question3 === ''? allQuestions.question1 : allQuestions.question3}</div>
                        </div>
                    </div>
                </div>

                <div className="col-span-7 w-10/12 mx-auto">

                    <div className="flex flex-col items-center">

                        <div className="mt-12 font-bold text-3xl text-black ">
                            Create a new Space
                        </div>

                        <div className="mt-8 ">
                            After the Space is created, it will generate a dedicated page for collecting testimonials.
                        </div>
                    </div>

                    <div className="mt-12">
                        <div>Space name</div>
                        <input type="text" placeholder="Space name" className="border"
                            onChange={(e) => {
                                setSpaceName(e.target.value)
                            }} />
                    </div>

                    <div className="mt-4">
                        <div>Space logo</div>
                        <div>
                            <button className="border">Upload</button>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div>Header Title</div>
                        <div>
                            <input type="text" placeholder="Title" className="border"
                                onChange={(e) => {
                                    setTile(e.target.value)
                                }} />
                        </div>
                    </div>

                    <div className="mt-4">
                        <div>Custom Message</div>
                        <div>
                            <textarea placeholder="Type the custom message that you required" className="border"
                                onChange={(e) => {
                                    setCustomMessage(e.target.value)
                                }} />
                        </div>
                    </div>

                    <div className="mt-4">
                        <div>Questions</div>
                        <div><input type="text" placeholder="Question what you like" className="border mt-2"
                            onChange={(e) => {
                                setAllQuestions({
                                    ...allQuestions,
                                    question1: e.target.value
                                })
                            }} />
                        </div>

                        <div><input type="text" placeholder="Question what you like" className="border mt-2"
                            onChange={(e) => {
                                setAllQuestions({
                                    ...allQuestions,
                                    question2: e.target.value
                                })
                            }} />
                        </div>

                        <div><input type="text" placeholder="Question what you like" className="border mt-2"
                            onChange={(e) => {
                                setAllQuestions({
                                    ...allQuestions,
                                    question3: e.target.value
                                })
                            }} />
                        </div>
                    
                    </div>

                    <div className="mt-4">
                        <button className="border">Create new space</button>
                    </div>

                </div>

            </div>
            
        </div>
    )
}
