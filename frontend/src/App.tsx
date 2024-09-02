import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { LandingPage } from './components/Pages/LandingPage';
import { SignUp } from './components/Pages/SignUp';
import { Dashboard } from './components/Pages/Dashboard'
import './index.css';
import { CreateSpace } from './components/Pages/CreateSpace';

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LandingPage /> } />
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/create' element={ <CreateSpace /> } />
        </Routes>
      </BrowserRouter>
      </div>  
  )
}

export default App
