import { Main } from "./components/Main";
import { NavBar } from "./components/NavBar"
import { Cards } from "./components/Cards"
import './index.css';
import { SixCards } from "./components/SixCards";

function App() {
  
  return (
    <div className="mx-3 md:mx-12 mt-4">
      <NavBar />
      <Main />
      <Cards />
      <SixCards />
      </div>  
     
  )
}

export default App
