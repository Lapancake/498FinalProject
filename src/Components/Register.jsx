import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", formData);
      console.log(response);
      
      if (response.status === 200 || response.status === 201) { 
        sessionStorage.setItem("logged", "1");
        sessionStorage.setItem("username", formData.username);
  
        alert(response.data.message || "Account created successfully!");
        window.location.href = "/";
      } else {
        alert("Signup failed, please try again.");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed, try again.");
    }
  };
  
  
  

  return (
    <div className="bg-gray-50 font-sans">
      <main className="py-24">
        <section className="container mx-auto bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-4xl font-bold text-center mb-8">Create Your Account</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-medium">Username</label>
              <input
                type="text"
                name="username"
                className="w-full p-3 border rounded-lg"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="w-full p-3 border rounded-lg"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border rounded-lg"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 shadow-lg"
            >
              Create Account
            </button>
          </form>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Log in here
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
};

export default Register;