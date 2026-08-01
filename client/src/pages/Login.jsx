// client/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Login</h2>
        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
        <input name="email" placeholder="Email" onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mb-3" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full mb-4" />
        <button type="submit" className="bg-blue-600 text-white text-sm font-medium rounded-md px-4 py-2 w-full hover:bg-blue-700 transition-colors">
          Login
        </button>
        <a href="/register" className="block text-center text-sm text-blue-600 hover:underline mt-4">
          No account? Register
        </a>
      </form>
    </div>
  );
}

export default Login;