import { BrowserRouter, Routes,Route } from 'react-router-dom';
import { LandingPage } from './components/Pages/LandingPage';
import { SignUp } from './components/Pages/SignUp';
import { Dashboard } from './components/Pages/Dashboard'
import './index.css';

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LandingPage /> } />
          <Route path='/signup' element={ <SignUp /> } />
          <Route path='/dashboard' element={ <Dashboard /> } />
        </Routes>
      </BrowserRouter>
      </div>  
  )
}

export default App
