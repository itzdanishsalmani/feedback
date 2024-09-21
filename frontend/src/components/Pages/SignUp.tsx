import axios from "../BaseURL/axios";
import { useState } from "react";
import { WhiteButton } from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function SignUp() {
  const [username, setUserame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  async function handle() {
    if (username === "" || email === "" || password === "") {
      toast("Fields cannot be empty");
      return;
      
    } else {
      const res = await axios.post("/signup", {
        username,
        email,
        password,
      }, { withCredentials: true });
      
      if (res.data) {
        localStorage.setItem("access_token",res.data.access_token)
        toast(res.data.message);
        console.log(res.data);
        navigate('/dashboard')

      } else {
        toast(res.data.error);
      }
    }
  }

  return (
    <div className="bg-black">
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-4 rounded-lg">
          <div className="text-center font-bold text-xl">Create an account</div>
          <div className="mt-4 text-center">
            Enter your email below to create an account
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="John doe"
              className="w-full rounded-lg text-white border p-2 bg-black"
              onChange={(e) => {
                setUserame(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="johndoe@example.com"
              className="mt-4 w-full rounded-lg text-white border p-2 bg-black"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              className="mt-4 w-full rounded-lg text-white border p-2 bg-black"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <WhiteButton text="Sign up" onClick={handle} />
            <div className="mt-4 text-center">
              By clicking on Continue, you agree to our{" "}
              <span className="underline">Terms of Service</span> and{" "}
              <span className="underline">Privacy policy.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
