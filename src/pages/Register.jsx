import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await axios.post(`${apiUrl}/api/account/register/`, formData);

      // Save username to localStorage and navigate
      localStorage.setItem("registerUsername", formData.username);
      toast.success("Registration successful! Redirecting...");
      navigate("/otp", { state: { username: formData.username } });
    } catch (err) {
      const errorMsg =
        err.response?.data?.username?.[0] ||
        err.response?.data?.email?.[0] ||
        err.response?.data?.password?.[0] ||
        err.response?.data?.detail ||
        "Registration failed. Please try again.";
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <section className="min-h-screen flex justify-between md:items-center md:justify-center bg-black text-white">
      <div className="flex flex-col md:flex-row md:max-w-4xl  md:rounded-3xl md:shadow-2xl md:overflow-hidden">
        {/* Left Section */}
        <div className="md:w-1/2  md:p-10 md:flex md:flex-col md:justify-between">
          <div className="p-8 md:p-0 flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="text-2xl "
            >
              <GoArrowLeft />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="font-semiboldhover:underline"
            >
              Login
            </button>
          </div>
          <div className="space-y-4 p-8 md:mt-10 md:p-0">
            <h1 className="text-3xl md:text-4xl font-semibold ">
              Sign Up
            </h1>
            <p className="text-sm md:text-base ">
              Create an account to get started. It only takes a few seconds, and
              you'll unlock all features right away.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1  p-8 rounded-t-4xl md:rounded-t-none md:p-10 md:w-1/2">
          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="py-4 px-5  w-full rounded-full md:rounded-lg border border-orange-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="py-4 px-5  w-full rounded-full md:rounded-lg border border-orange-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="py-4 px-5  w-full rounded-full md:rounded-lg border border-orange-500"
            />
            <button
              type="submit"
              className="py-4 px-5  w-full rounded-full md:rounded-lg border border-orange-500"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Register;
