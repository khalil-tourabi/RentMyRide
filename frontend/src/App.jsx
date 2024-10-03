import { Route, Routes } from "react-router-dom";

import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import Homepage from "./components/HomePage/Homepage";
import CarPage from "./components/HomePage/CarPage";
import AboutUs from "./components/Pages/AboutUs";
import ContactUs from "./components/Pages/ContactUs";
import TermsAndConditions from "./components/Pages/TermsAndConditions";
import Privacy from "./components/Pages/Privacy";
import ClientProfile from "./components/Client/ClientProfile";
import AgencyProfile from "./components/Agency/AgencyProfile";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminBookingManagement from "./components/Admin/ManageBookings";
import AdminCarsManagement from "./components/Admin/ManageCars";
import AdminSettings from "./components/Admin/Settings";
import ManageUsers from "./components/Admin/ManageUsers";
import BookingHistory from "./components/Client/BookingHistory";
import Reviews from "./components/Client/ReviewsHistory";
import ManageCars from "./components/Agency/AgencyCarsManagement";
import ManageBookings from "./components/Agency/AgencyBookingManagment";
import AgencyReviews from "./components/Agency/AgencyReviews";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/car/:carId" element={<CarPage />} />

      {/* Static page: */}
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/termsandconditions" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<Privacy />} />

      {/* Forms: */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Client Pages:  */}
      <Route path="/clientprofile" element={<ClientProfile />} />
      <Route path="/clientbookinghistory" element={<BookingHistory />} />
      <Route path="/clientreviewhistory" element={<Reviews />} />

      {/* Agency Pages: */}
      <Route path="/agencyprofile" element={<AgencyProfile />} />
      <Route path="/agencycarmanagement" element={<ManageCars />} />
      <Route path="/agencybookingmanagement" element={<ManageBookings />} />
      <Route path="/agencyreviews" element={<AgencyReviews />} />

      {/* Admin Pages:  */}
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/adminmanagebookings" element={<AdminBookingManagement />} />
      <Route path="/adminmanagecars" element={<AdminCarsManagement />} />
      <Route path="/adminmanageusers" element={<ManageUsers />} />
      <Route path="/adminsettings" element={<AdminSettings />} />
    </Routes>
  );
}

export default App;
