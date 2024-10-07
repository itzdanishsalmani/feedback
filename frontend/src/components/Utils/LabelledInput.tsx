interface LabelledInputProps {
    type:string,
    placeholder:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
  }
  
  export const LabelledInput = ({ type, placeholder, onChange }:LabelledInputProps) => {
    return (
      <div>
        <input
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className="mt-4 w-full rounded-lg p-3 bg-neutral-800"
        />
      </div>
    );
  };
  