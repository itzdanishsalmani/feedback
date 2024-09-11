import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { LandingPage } from './components/Pages/LandingPage';
import { SignUp } from './components/Pages/SignUp';
import { Dashboard } from './components/Pages/Dashboard'
import { CreateSpace } from './components/Pages/CreateSpace';
import { useEffect,useState } from 'react';
import { UserSpace } from './components/Pages/UserSpace';
import { Summary } from './components/Pages/Summary';
import './index.css';
import { FetchSpace } from './Utils/FetchSpace';

function App() {

  const [space,setSpace] = useState<string>("")
  const [ userId,setUserId] = useState<string>("")

  useEffect(() => {
    async function getData() {
      const { space, userId } = await FetchSpace(); 
      setSpace(space);
      setUserId(userId);
    }

    getData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LandingPage/> } />
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/create' element={ <CreateSpace /> } />
          <Route path='/summary' element={ <Summary/> } />
            
            {(space && userId) &&
              <Route path={`${space}${userId}`} element={ <UserSpace /> } />
            }

        </Routes>
      </BrowserRouter>
      </div>  
  )
}

export default App