import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${apiUrl}/api/account/login/`, formData);
      localStorage.setItem("authToken", res.data.token);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      const message = err?.response?.data?.detail || "Login failed. Please try again.";
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
      });
      // console.error(err.response.data);
    }
  };

  return (
    <section className="min-h-screen flex justify-between md:items-center md:justify-center bg-black text-white">
      <div className="flex flex-col md:flex-row md:max-w-4xl   md:rounded-3xl md:shadow-2xl md:overflow-hidden">
        {/* Left Section (Header + Description) for Desktop */}
        <div className="md:w-1/2  md:p-10 md:flex md:flex-col md:justify-between">
          <div className="p-8 md:p-0 flex items-center justify-between">
            <button onClick={() => navigate("/")} className="text-2xl ">
              <GoArrowLeft />
            </button>
            <button
              onClick={() => navigate("/register")}
              className="font-semibold  hover:underline"
            >
              Register
            </button>
          </div>
          <div className="space-y-4 p-8 md:mt-10 md:p-0">
            <h1 className="text-3xl md:text-4xl font-semibold ">Sign In</h1>
            <p className="text-sm md:text-base">
              Securely sign in to access your dashboard, manage your account,
              and explore all features.
            </p>
          </div>
        </div>

        <div className="flex-1 p-8 rounded-t-4xl md:rounded-t-none  md:p-10 md:w-1/2">
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="py-4 px-5 w-full rounded-full md:rounded-lg border border-orange-500"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="py-4 px-5 w-full rounded-full md:rounded-lg border border-orange-500"
            />
            <div className="flex justify-end">
              <Link
                to="/password-reset/request"
                className="text-sm text-green-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="py-4 px-5 w-full rounded-full md:rounded-lg border border-orange-500"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* react toastify to handle messages */}
      <ToastContainer />
    </section>
  );
};

export default Login;
