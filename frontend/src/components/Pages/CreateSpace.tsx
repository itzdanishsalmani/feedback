export function CreateSpace() {
    return (
        <div className="max-w-[1200px] mx-auto text-gray-800">
            <div className="grid grid-cols-12">
                <div className="col-span-5 px-12 mt-12 border">
                    <div className="flex flex-col items-center">
                        <div>
                            image
                        </div>
                        <div>dlknsdfln</div>
                        <div className="mt-4 text-3xl font-bold">
                            Header Goes here
                        </div>
                        <div className="mt-4 ">
                            Custom message goes here
                        </div>

                        <div className="mt-4">
                            Questions comes here

                            <div>Questons</div>
                            <div>Questons</div>
                            <div>Questons</div>
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
                        <input type="text" placeholder="Space name" className="border" />
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
                            <input type="text" placeholder="Title" className="border" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <div>Custom Message</div>
                        <div>
                            <textarea placeholder="Type the custom message that you required" className="border" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <div>Questions</div>
                        <div><input type="text" placeholder="Question what you like" className="border mt-2" /></div>
                        <div><input type="text" placeholder="Question what you like" className="border mt-2" /></div>
                        <div><input type="text" placeholder="Question what you like" className="border mt-2" /></div>
                    </div>

                    <div className="mt-4">
                        <button className="border">Create new space</button>
                    </div>

                </div>

            </div>
        </div>
    )
}