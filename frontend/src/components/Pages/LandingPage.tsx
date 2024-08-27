import { MainSection } from "../UI/MainSection";
import { NavBar } from "../UI/NavBar"
import { NineCardSection } from "../UI/NineCardSection"
import { SixCardSection } from "../UI/SixCardSection";
import { IntegrateSection } from '../UI/IntegrateSection';
import { Footer } from '../UI/Footer';

export function LandingPage() {
  
  return (
    <div className="px-3 pd:px-12 pt-4 bg-neutral-900">
      <NavBar />
      <MainSection />
      <NineCardSection />
      <SixCardSection />
      <IntegrateSection />
      <Footer />
      </div>  
  )
}

