import axios from "axios"

export async function FetchSpace() {
    const res = await axios.get(`http://localhost:3000/getspace`,{
      withCredentials:true
    })
    if(res.data)
      console.log(res.data);
    return{
        space:res.data.spacenames,
        userId:res.data.userId
    } 
}