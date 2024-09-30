import { useState, useEffect } from "react";
import axios from "axios";

const ClientProfile = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    idNumber: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/api/getuserprofile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { user, profile } = response.data;

        setProfileData({
          username: user?.username || "",
          email: user?.email || "",
          phone: user?.phone || "",
          firstName: profile?.firstName || "",
          lastName: profile?.lastName || "",
          idNumber: profile?.idNumber || "",
          address: profile?.address || "",
          city: profile?.city || "",
          country: profile?.country || "",
          zipCode: profile?.zipCode || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // You can set profileData to empty strings or default values if error occurs
        setProfileData({
          username: "",
          email: "",
          phone: "",
          firstName: "",
          lastName: "",
          idNumber: "",
          address: "",
          city: "",
          country: "",
          zipCode: "",
        });
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      await axios.put(
        `http://localhost:3000/api/updateuserdetails/${userId}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Client Profile</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            className="p-2 border border-gray-300 rounded"
            placeholder="Username"
            name="username"
            value={profileData.username || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <input
            className="p-2 border border-gray-300 rounded"
            placeholder="Email"
            name="email"
            value={profileData.email || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <input
            className="p-2 border border-gray-300 rounded"
            placeholder="Phone"
            name="phone"
            value={profileData.phone || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <input
            className="p-2 border border-gray-300 rounded"
            placeholder="First Name"
            name="firstName"
            value={profileData.firstName || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <input
            className="p-2 border border-gray-300 rounded"
            placeholder="Last Name"
            name="lastName"
            value={profileData.lastName || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <input
            className="p-2 border border-gray-300 rounded"
            placeholder="ID Number"
            name="idNumber"
            value={profileData.idNumber || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <input
            className="p-2 border border-gray-300 rounded"
            placeholder="Address"
            name="address"
            value={profileData.address || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <input
            className="p-2 border border-gray-300 rounded"
            placeholder="City"
            name="city"
            value={profileData.city || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <input
            className="p-2 border border-gray-300 rounded"
            placeholder="Country"
            name="country"
            value={profileData.country || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <input
            className="p-2 border border-gray-300 rounded"
            placeholder="Zip Code"
            name="zipCode"
            value={profileData.zipCode || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          {isEditing && (
            <button
              className="col-span-2 bg-green-500 text-white py-2 px-4 rounded mt-4"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
