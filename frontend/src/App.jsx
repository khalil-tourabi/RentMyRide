import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Homepage from "./components/HomePage/Homepage";
import CarPage from "./components/CarPage";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import TermsAndConditions from "./components/TermsAndConditions";
import Privacy from "./components/Privacy";
import ClientProfile from "./components/ClientProfile";
import AgencyProfile from "./components/AgencyProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageBookings from "./components/Admin/ManageBookings";
import ManageCars from "./components/Admin/ManageCars";
import Settings from "./components/Admin/Settings";
import ManageUsers from './components/Admin/ManageUsers';

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
      <Route path="/clientprofile" element={<ClientProfile />} />
      <Route path="/agencyprofile" element={<AgencyProfile />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/managebookings" element={<ManageBookings />} />
      <Route path="/managecars" element={<ManageCars />} />
      <Route path="/manageusers" element={<ManageUsers />} />
      <Route path="/adminsettings" element={<Settings />} />
    </Routes>
  );
}

export default App;
