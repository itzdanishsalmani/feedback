import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { LandingPage } from './components/Pages/LandingPage';
import { SignUp } from './components/Pages/SignUp';
import { Dashboard } from './components/Pages/Dashboard'
import './index.css';
import { CreateSpace } from './components/Pages/CreateSpace';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { UserSpace } from './components/Pages/UserSpace';
import { Summary } from './components/Pages/Summary';

function App() {

  const[space,setSpace] = useState<string>("")
  const [ userId,setUserId] = useState<string>("")

  useEffect(()=>{
    FetchSpace()
  },[])

  async function FetchSpace() {
    const res = await axios.get("http://localhost:3000/getspace",{
      withCredentials:true
    })
  
    if(res.data){
      console.log(res.data)
      setSpace(res.data.spacenames)
      setUserId(res.data.userId)
    }
  }
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LandingPage/> } />
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/create' element={ <CreateSpace /> } />
          <Route path='/summary' element={ <Summary/> } />
          <Route path={`/${space}/${userId}`} element={ <UserSpace /> } />
        </Routes>
      </BrowserRouter>
      </div>  
  )
}

export default App
