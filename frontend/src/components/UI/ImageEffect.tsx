
interface imageText {
    text1:string,
    text2:string,
    text3:string,
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export const ImageEffect = ({text1,text2,text3,onClick}:imageText) => {
return (
    <div className="bg-slate-100 w-screen h-screen">
    <div className="flex flex-col h-screen justify-center items-center text-center">
      <div className="h-96 bg-white rounded-lg">
      <img src="raise_glass.gif" alt="" className="rounded-lg p-4"/>
      <div className="text-neutral-600">
        <div className="text-black font-semibold">{text1}</div>
        <div className="mt-2">{text2}</div>
         <div> {text3}</div>
      </div>
      <div className="mt-2">
      <button
        onClick={onClick}
        className=" text-neutral-600 font-medium border border-neutral-400 w-80 p-2 rounded-lg"
      >
        Close
      </button>
      </div>
      </div>
    </div>
  </div>
)
}