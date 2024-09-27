import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const [isPhoneView, setPhoneView] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center ">
        <div>
          <img src="/logo.svg" alt="" width={150} />
        </div>

        <div className="hidden md:flex flex-row space-x-8 ">
          <div>Customers</div>
          <div>Features</div>
          <div>Integrations</div>
          <div>Pricing</div>
        </div>

        <div className="hidden md:flex flex-row space-x-8 items-center cursor-pointer">
          <div onClick={() => navigate("/signin")}> Sign in </div>
          <div
            className=" bg-blue-700 p-1.5 rounded-md cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            {" "}
            Sign up{" "}
          </div>
        </div>

        <div
          className="block md:hidden"
          onClick={() => {
            setPhoneView(!isPhoneView);
          }}
        >
          <img src="menu.svg" alt="" />
        </div>
      </div>

      {isPhoneView && (
        <div className="px-4 mt-4 border-b border-neutral-800 md:hidden space-y-2">
          <div>Customers</div>
          <div>Features</div>
          <div>Integrations</div>
          <div>Pricing</div>
        </div>
      )}
    </div>
  );
};
