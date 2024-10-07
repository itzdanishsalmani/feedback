import { NavBarOther } from "../UI/NavBarOther";
import { Footer } from "../UI/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../BaseURL/axios";
import { toast } from "react-toastify";
import { BlueButton } from "../Utils/Button";

export function Dashboard() {
  const[space,setSpace] = useState<string>("")
  const [showCreateSpace, setShowCreateSpace] = useState<boolean>(true)

  useEffect(()=>{
    FetchSpace()
  },[])

  async function FetchSpace() {
    try {
      
      const res = await axios.get("/getspace",{
        
        headers:{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      
      if(res.data.spacenames && res.data.spacenames.length != 0){
        console.log(res.data)
        setSpace(res.data.spacenames)
        setShowCreateSpace(false)
      }
    } catch (error) {
      toast("Error while fetching details")
    }
    }
 
  return (
    <div className="bg-neutral-900">
      <div>
        <NavBarOther />
        <Mid />
      <Space space={space} showCreateSpace={showCreateSpace}/>
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
      </div>
      <div className="md:pl-24 px-4 md:mt-4">
        <img src="image-6.png" alt="" width={400} />
      </div>
    </div>
  );
}


function Space({space,showCreateSpace}:any) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="mt-24 flex justify-between items-center px-4 md:px-24 ">
        <div className="cursor-pointer text-3xl underline" onClick={()=>(navigate('/summary'))}>
          {space}
        </div>
        { showCreateSpace &&
        <div>

          <BlueButton 
          text="Create Space"
          onClick={()=>(navigate('/create'))}/>
        </div>
}
      </div>
    </div>
  )
}
