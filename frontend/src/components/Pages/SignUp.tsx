import axios from "../BaseURL/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { WhiteButton } from "../Utils/Button";
import { LabelledInput } from "../Utils/LabelledInput";

export function SignUp() {
  const [username, setUserame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSignup() {
    if (username === "" || email === "" || password === "") {
      toast("Fields cannot be empty");
      return;
    } else {
      const res = await axios.post("/signup", {
        username,
        email,
        password,
      });

      if (res.data.message) {
        localStorage.setItem("access_token", res.data.access_token);
        toast(res.data.message);
        console.log(res.data);
        navigate("/dashboard");
      } else {
        toast(res.data.error);
      }
    }
  }

  return (
    <div className="bg-neutral-900">
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-4 rounded-lg">
          <div className="text-center font-bold text-xl">
            {" "}
            Create an account into Testimonialss
          </div>

          <div className="mt-2">
          <LabelledInput
              type="text"
              placeholder="Username"
              onChange={(e) => setUserame(e.target.value)}
            />
          </div>

          <div className="mt-2">
            <LabelledInput
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-2">
            <LabelledInput
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <WhiteButton text="Sign up" onClick={handleSignup} />
          </div>
          <div className="mt-6 text-center">
            <span className="text-neutral-400">Already have an account? </span>
            <span
              className="cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
