import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const carSchema = z.object({
  brand: z.string().nonempty("Brand is required"),
  model: z.string().nonempty("Model is required"),
  year: z.number().min(1886, "Year must be valid").max(new Date().getFullYear(), "Year must not be in the future"),
  mileage: z.number().min(0, "Mileage must be at least 0"),
  dailyPrice: z.number().min(0, "Price must be at least 0"),
  availableFrom: z.string().nonempty("Available From is required"),
  availableTo: z.string().nonempty("Available To is required"),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  image: z.instanceof(File).optional(),
});

const initialCars = [
  { id: 1, brand: "Toyota", model: "Camry", year: 2020, mileage: 15000, dailyPrice: 50, availableFrom: "2023-01-01", availableTo: "2023-12-31", description: "", features: [], image: null },
  // Add more sample cars as needed
];

const ManageCars = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cars, setCars] = useState(initialCars);
  const [currentCar, setCurrentCar] = useState(null);
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(carSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: "",
      mileage: "",
      dailyPrice: "",
      availableFrom: "",
      availableTo: "",
      description: "",
      image: null,
    },
  });

  const handleAddFeature = () => {
    if (featureInput) {
      setFeatures((prevFeatures) => [...prevFeatures, featureInput]);
      setFeatureInput("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
    }
  };

  const onSubmit = (data) => {
    const newCarData = { ...data, features };
    if (currentCar) {
      setCars(cars.map(car => car.id === currentCar.id ? { ...newCarData, id: currentCar.id } : car));
    } else {
      setCars([...cars, { ...newCarData, id: Date.now() }]);
    }
    reset();
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setFeatures([]);
    setCurrentCar(null);
  };

  const handleEdit = (car) => {
    setCurrentCar(car);
    setValue("brand", car.brand);
    setValue("model", car.model);
    setValue("year", car.year);
    setValue("mileage", car.mileage);
    setValue("dailyPrice", car.dailyPrice);
    setValue("availableFrom", car.availableFrom);
    setValue("availableTo", car.availableTo);
    setValue("description", car.description);
    setFeatures(car.features || []);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = (carId) => {
    setCars(cars.filter(car => car.id !== carId));
    setIsDeleteModalOpen(false);
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
                  onClick={() => {
                    setCurrentCar(car);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {(isModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">{currentCar ? "Edit Car" : "Add New Car"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block mb-2">Brand</label>
                <input
                  type="text"
                  {...register("brand")}
                  className={`border rounded p-2 w-full ${errors.brand ? "border-red-500" : ""}`}
                />
                {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Model</label>
                <input
                  type="text"
                  {...register("model")}
                  className={`border rounded p-2 w-full ${errors.model ? "border-red-500" : ""}`}
                />
                {errors.model && <p className="text-red-500">{errors.model.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Year</label>
                <input
                  type="number"
                  {...register("year")}
                  className={`border rounded p-2 w-full ${errors.year ? "border-red-500" : ""}`}
                />
                {errors.year && <p className="text-red-500">{errors.year.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Mileage</label>
                <input
                  type="number"
                  {...register("mileage")}
                  className={`border rounded p-2 w-full ${errors.mileage ? "border-red-500" : ""}`}
                />
                {errors.mileage && <p className="text-red-500">{errors.mileage.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Daily Price</label>
                <input
                  type="number"
                  {...register("dailyPrice")}
                  className={`border rounded p-2 w-full ${errors.dailyPrice ? "border-red-500" : ""}`}
                />
                {errors.dailyPrice && <p className="text-red-500">{errors.dailyPrice.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Available From</label>
                <input
                  type="date"
                  {...register("availableFrom")}
                  className={`border rounded p-2 w-full ${errors.availableFrom ? "border-red-500" : ""}`}
                />
                {errors.availableFrom && <p className="text-red-500">{errors.availableFrom.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Available To</label>
                <input
                  type="date"
                  {...register("availableTo")}
                  className={`border rounded p-2 w-full ${errors.availableTo ? "border-red-500" : ""}`}
                />
                {errors.availableTo && <p className="text-red-500">{errors.availableTo.message}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  {...register("description")}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Features</label>
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  className="border rounded p-2 w-full"
                />
                <button type="button" onClick={handleAddFeature} className="mt-2 bg-blue-600 text-white px-2 py-1 rounded">Add Feature</button>
                <div>
                  {features.map((feature, index) => (
                    <span key={index} className="bg-gray-200 rounded-full px-2 py-1 mr-2 inline-block">{feature}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => { setIsModalOpen(false); setIsEditModalOpen(false); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{currentCar ? "Update Car" : "Add Car"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this car?</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleDeleteConfirm(currentCar.id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
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
