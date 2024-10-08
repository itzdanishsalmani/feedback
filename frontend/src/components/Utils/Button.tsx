import { useState } from "react";

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const BlueButton = ({ text, onClick }: ButtonProps) => {
  const [isDisabled,setIsDisabled] = useState(false) ;

  function handleButton(e:React.MouseEvent<HTMLButtonElement>) {
    setIsDisabled(true)

    setTimeout(()=>{
      setIsDisabled(false)
    },5000)

    onClick(e)
  }
  return (
    <>
      <button disabled={isDisabled}
        // className="border rounded-lg font-medium text-white bg-blue-600 p-2"
        className={isDisabled ? "disabled-button" : "blue-button"}
        onClick={handleButton}
      >
        {text}
      </button>
    </>
  );
};

export const WhiteButton = ({ text, onClick }: ButtonProps) => {
  const [isDisabled,setIsDisabled] = useState(false) ;

  function handleButton(e:React.MouseEvent<HTMLButtonElement>) {
    setIsDisabled(true)

    setTimeout(()=>{
      setIsDisabled(false)
    },5000)

    onClick(e)
  }
  return (
    <>
      <button disabled={isDisabled}
        className={isDisabled ? "disabled-white-button" : "white-button"}
        onClick={handleButton}
      >
        {text}
      </button>
    </>
  );
};
