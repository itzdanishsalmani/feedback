import { NavBarOther } from "../UI/NavBarOther";
import { Footer } from "../UI/Footer";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="bg-neutral-900">
      <div>
        <NavBarOther />
        <Mid />
        <Space />
        <Footer />
      </div>
    </div>
  );
}

function Mid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
      <div className="px-12">
        <div className="text-3xl">Here's a quick demo for you 👉</div>
        <div className="mt-4 text-lg">
          You will find everything you need to get started to collect
          testimonials and build a wall of love
        </div>
        <div>
          <button className="border">Dismiss</button>
        </div>
      </div>
      <div className="md:pl-24 px-4 md:mt-4">
        <img src="image-6.png" alt="" width={400} />
      </div>
    </div>
  );
}

function Space() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="mt-24 flex justify-between items-center px-24">
        <div>
          Spaces
        </div>
        <div>
          <button className="border" onClick={()=>{
            navigate('/create')
          }}>Create Space</button>
        </div>
      </div>
    </div>
  )
}
