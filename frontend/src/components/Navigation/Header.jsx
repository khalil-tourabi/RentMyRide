import { useEffect, useState } from "react";
import logo from "../../assets/logo-no-background.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { Dropdown } from "flowbite-react";

const Header = () => {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    console.log("userEmail: ", userEmail);

    if (userEmail) {
      setIsLoggedIn(true);

      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/userbyemail?email=${userEmail}`
          );
          const { id, userType } = response.data;

          console.log("userid: ", id);
          localStorage.setItem("userId", id);
          localStorage.setItem("userType", userType);

          setUserType(userType);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserType(null);
    window.location.href = "/";
  };

  return (
    <>
      <header className="flex shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          <Link to="/" className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <img src={logo} alt="logo" className="w-36" />
          </Link>
          <div id="collapseMenu" className="max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:bg-white max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <ul className="lg:flex lg:gap-x-5">
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link to={"/"} className="hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]">Home</Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link to={"/aboutus"} className="hover:text-[#007bff] text-[#333] block font-semibold text-[15px]">About Us</Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3 px-3">
                <Link to={"/contactus"} className="hover:text-[#007bff] text-[#333] block font-semibold text-[15px]">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center ml-auto space-x-6">
            {!isLoggedIn && (
              <>
                <button className="font-semibold text-[15px] border-none outline-none">
                  <Link to={"/login"} className="text-[#007bff] hover:underline">Login</Link>
                </button>
                <Link to={"/register"} className="px-4 py-2 text-sm rounded-sm font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">Sign up</Link>
              </>
            )}

            {isLoggedIn && (
              <>
                {userType === "CLIENT" && (
                  <Dropdown arrowIcon={false} inline label={<CgProfile className="w-7 h-7 text-gray-800" />}>
                    <Dropdown.Item>
                      <Link to={"/clientprofile"}>Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={"/clientbookinghistory"}>Reservations</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={"/clientreviewhistory"}>Reviews</Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                      <button onClick={handleLogout}>Logout</button>
                    </Dropdown.Item>
                  </Dropdown>
                )}

                {userType === "AGENCY" && (
                  <Dropdown arrowIcon={false} inline label={<CgProfile className="w-7 h-7 text-gray-800" />}>
                    <Dropdown.Item>
                      <Link to={"/agencyprofile"}>Profile</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={"/agencybookingmanagement"}>Agency Reservations</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link to={"/agencycarmanagement"}>Agency cars</Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                      <button onClick={handleLogout}>Logout</button>
                    </Dropdown.Item>
                  </Dropdown>
                )}
              </>
            )}

            {userType === "ADMIN" && (
              <p className="text-sm font-semibold text-gray-800">Admin Panel</p>
            )}

            <button id="toggleOpen" className="lg:hidden">
              <svg className="w-7 h-7" fill="#333" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
