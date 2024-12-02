import React, { useEffect } from "react";
import { useState } from "react";
import imgbg from "../assets/bg-login.jpg";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [formsup, setFormsup] = useState({
    role: "SPSO",
    username: "ohaha",
    password: "123456",
    full_name: "Nguyen Khang",
    email: "khang1234@hcmut.edu.vn",
    phone_number: "0949131378",
    date_of_birth: "121204"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // useEffect(() => {
  //   const autoSignup = async () => {
  //     try {
        
  //       const res = await axios.post("http://localhost:5000/api/auth/signup", formsup);
  //       console.log(res);
  //       if (res.status === 201) {
  //         console.log("Sign-up successful:", res.data);
  //         alert("Sign-up successful! You can now log in.");
  //       }
  //     } catch (error) {
    
  //     }
  //   };
  // }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here

    try
    {
      const res = await axios.post("http://localhost:5000/api/auth/signin",formData);
      console.log(res);
      if(res.status === 200)
      {
        const accessToken = res.data.data.accessToken;
        const role = res.data.data.role;
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("user_role", role);
        console.log("Login successful!");
      if(role === 'SPSO')
        navigate("/admin");
      else if(role === 'USER')
        navigate("/user");
      else
        alert("Invalid role!");
      }
    }
   catch(error)
   {
    if (error.response) {
      console.error("Error response:", error.response.data);
      alert(error.response.data.message || "Invalid username or password.");
    } else if (error.request) {
      console.error("Error request:", error.request);
      alert("No response from the server. Please try again.");
    } else {
      console.error("Error message:", error.message);
      alert("Something went wrong. Please try again.");
    }
  }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
          <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
            <div
              className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
              style={{
                backgroundImage: `url(${imgbg})`,
              }}
            ></div>

            <div className="w-full p-8 lg:w-1/2">
              <p className="text-xl font-extrabold text-gray-600 text-center">
                Welcome back!
              </p>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  UserName
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {/* <a
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
                >
                  Forget Password?
                </a> */}
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
