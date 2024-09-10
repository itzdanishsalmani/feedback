import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { LandingPage } from './components/Pages/LandingPage';
import { SignUp } from './components/Pages/SignUp';
import { Dashboard } from './components/Pages/Dashboard'
import './index.css';
import { CreateSpace } from './components/Pages/CreateSpace';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { UserSpace } from './components/Pages/UserSpace';

function App() {

  const[space,setSpace] = useState<string>("")

  useEffect(()=>{
    FetchSpace()
  },[])

  async function FetchSpace() {
    const res = await axios.get("http://localhost:3000/getspace",{
      withCredentials:true
    })
  
    if(res.data){
      console.log(res.data.spacenames)
      setSpace(res.data.spacenames)
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
          <Route path='/space' element={ <UserSpace /> } />
        </Routes>
      </BrowserRouter>
      </div>  
  )
}

export default App
