// client/src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Register</h2>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <input name="name" placeholder="Name" onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mb-3" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mb-3" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mb-4" />
        <button type="submit" className="bg-blue-600 text-white text-sm font-medium rounded-md px-4 py-2 w-full hover:bg-blue-700 transition-colors">
          Register
        </button>
        <a href="/login" className="block text-center text-sm text-blue-600 hover:underline mt-4">
          Already have an account? Login
        </a>
      </form>
    </div>
  );
}

export default Register;