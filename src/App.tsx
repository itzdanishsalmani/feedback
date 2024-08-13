import './index.css';
import { MainSection } from "./components/MainSection";
import { NavBar } from "./components/NavBar"
import { NineCardSection } from "./components/NineCardSection"
import { SixCardSection } from "./components/SixCardSection";
import { IntegrateSection } from './components/IntegrateSection';
import { Footer } from './components/Footer';

function App() {
  
  return (
    <div className="mx-3 md:mx-12 mt-4">
      <NavBar />
      <MainSection />
      <NineCardSection />
      <SixCardSection />
      <IntegrateSection />
      <Footer />
      </div>  
     
  )
}

export default App
