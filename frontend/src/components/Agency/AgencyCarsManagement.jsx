import { useState, useEffect } from "react";
import axios from "axios";

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [currentCar, setCurrentCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [image, setImage] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    mileage: "",
    dailyPrice: "",
    availableFrom: "",
    availableTo: "",
    description: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/api/getagencycars/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddFeature = () => {
    if (featureInput) {
      setFeatures((prevFeatures) => [...prevFeatures, featureInput]);
      setFeatureInput("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    features.forEach((feature) => {
      data.append("features", feature);
    });
    if (image) {
      data.append("image", image);
    }

    data.append("ownerId", userId);

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/api/updatecar/${currentCar.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCars(
          cars.map((car) =>
            car.id === currentCar.id ? { ...car, ...formData } : car
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/addcar",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCars([...cars, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleEdit = (car) => {
    setCurrentCar(car);
    setFormData({
      brand: car.brand,
      model: car.model,
      year: car.year,
      mileage: car.mileage,
      dailyPrice: car.dailyPrice,
      availableFrom: car.availableFrom,
      availableTo: car.availableTo,
      description: car.description,
    });
    setFeatures(Array.isArray(car.features) ? car.features.map(feature => feature.name) : []); // Check for features
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDelete = (carId) => {
    setCarToDelete(carId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://localhost:3000/api/deletecar/${carToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars(cars.filter((car) => car.id !== carToDelete));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      brand: "",
      model: "",
      year: "",
      mileage: "",
      dailyPrice: "",
      availableFrom: "",
      availableTo: "",
      description: "",
    });
    setFeatures([]);
    setImage(null);
    setCurrentCar(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Manage Cars</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Car
      </button>

      <table className="min-w-full bg-white rounded shadow text-center">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4">Car Model</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Availability</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{`${car.brand} ${car.model}`}</td>
              <td className="py-2 px-4">${car.dailyPrice}/day</td>
              <td className="py-2 px-4 text-green-600">Available</td>
              <td className="py-2 px-4">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleEdit(car)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline ml-2"
                  onClick={() => handleDelete(car.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">
              {isEditing ? "Edit Car" : "Add New Car"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges();
              }}
            >
              <input
                className="border rounded p-2 w-full mb-2"
                placeholder="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
              />
              <input
                className="border rounded p-2 w-full mb-2"
                placeholder="Model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
              />
              <input
                type="number"
                className="border rounded p-2 w-full mb-2"
                placeholder="Year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
              />
              <input
                type="number"
                className="border rounded p-2 w-full mb-2"
                placeholder="Mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
              />
              <input
                type="number"
                className="border rounded p-2 w-full mb-2"
                placeholder="Daily Price"
                name="dailyPrice"
                value={formData.dailyPrice}
                onChange={handleInputChange}
              />
              <input
                type="date"
                className="border rounded p-2 w-full mb-2"
                name="availableFrom"
                value={formData.availableFrom}
                onChange={handleInputChange}
              />
              <input
                type="date"
                className="border rounded p-2 w-full mb-2"
                name="availableTo"
                value={formData.availableTo}
                onChange={handleInputChange}
              />
              <textarea
                className="border rounded p-2 w-full mb-2"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
              <div className="mb-4">
                <label className="block mb-2">Features</label>
                <div className="flex">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    className="border rounded p-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="ml-2 bg-blue-600 text-white p-2 rounded"
                  >
                    Add
                  </button>
                </div>
                <ul className="list-disc pl-5 mt-2">
                  {Array.isArray(features) ? features.map((feature, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{feature}</span>
                      <button
                        className="text-red-600"
                        onClick={() =>
                          setFeatures(features.filter((_, i) => i !== index))
                        }
                      >
                        Remove
                      </button>
                    </li>
                  )) : null}
                </ul>
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                className="mb-4"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Update Car" : "Add Car"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this car?</p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;
