import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/Pages/LandingPage";
import { SignUp } from "./components/Pages/SignUp";
import { Dashboard } from "./components/Pages/Dashboard";
import { CreateSpace } from "./components/Pages/CreateSpace";
import { UserSpace } from "./components/Pages/UserSpace";
import { Summary } from "./components/Pages/Summary";
import "./index.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateSpace />} />
          <Route path="/summary" element={<Summary />} />

          <Route path="/:spacename" element={<UserSpace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
