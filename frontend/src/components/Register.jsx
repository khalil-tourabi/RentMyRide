import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import logo from '../assets/logo-no-background.png';
import { useState } from 'react';

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  userType: z.enum(["CLIENT", "AGENCY"], "Please select an account type"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  cpassword: z.string().min(6, "Confirm Password must match the password"),
}).refine((data) => data.password === data.cpassword, {
  message: "Passwords do not match",
  path: ["cpassword"],
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        userType: data.userType,
      });

      // Handle successful registration
      console.log('User registered:', response.data);
      // Optionally, redirect to another page after success
      window.location.href = '/login';

    } catch (error) {
      console.error('Error registering user:', error.response?.data?.message || error.message);
      setApiError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
        <div className="text-center mb-16">
          <a href="javascript:void(0)">
            <img src={logo} alt="logo" className="w-52 inline-block" />
          </a>
          <h4 className="text-gray-800 text-base font-semibold mt-6">
            Create a new account
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Username</label>
              <input
                name="username"
                type="text"
                {...register("username")}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter Username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Phone number</label>
              <input
                name="phone"
                type="tel"
                {...register("phone")}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter Phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                {...register("email")}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Account</label>
              <select
                name="userType"
                {...register("userType")}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              >
                <option value="CLIENT">CLIENT</option>
                <option value="AGENCY">AGENCY</option>
              </select>
              {errors.userType && (
                <p className="text-red-500 text-xs mt-1">{errors.userType.message}</p>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Confirm Password
              </label>
              <input
                name="cpassword"
                type="password"
                {...register("cpassword")}
                className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                placeholder="Enter confirm password"
              />
              {errors.cpassword && (
                <p className="text-red-500 text-xs mt-1">{errors.cpassword.message}</p>
              )}
            </div>
          </div>
          {apiError && (
            <p className="text-red-500 text-center text-sm mt-4">{apiError}</p>
          )}
          <div className="!mt-12">
            <button
              type="submit"
              className="py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
