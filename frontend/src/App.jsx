import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/HomePage/Homepage";
import CarPage from "./components/CarPage";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import TermsAndConditions from "./components/TermsAndConditions";
import Privacy from "./components/Privacy";
import ClientProfilePage from "./components/ClientProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/car" element={<CarPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/termsandconditions" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/clientprofile" element={<ClientProfilePage />} />
    </Routes>
  );
}

export default App;
