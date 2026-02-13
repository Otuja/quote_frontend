import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await axios.post(`${apiUrl}/api/account/login/`, formData);
      localStorage.setItem("authToken", res.data.token);
      toast.success("Logged in successfully");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      const message =
        err?.response?.data?.detail || "Login failed. Please try again.";
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center section">
      <div className="w-full max-w-md fade-in">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#14B8A6] mb-2">
            Welcome Back
          </h1>
          <p className="text-[#94A3B8]">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="card fade-in-delay-1">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="input"
              required
            />
          </div>

          <div className="flex justify-end mb-4">
            <Link
              to="/password-reset/request"
              className="text-sm text-[#14B8A6] hover:text-[#0D9488] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full mb-4"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading-spinner"></span>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="text-center pt-4 border-t border-[#334155]">
            <p className="text-[#94A3B8]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#14B8A6] hover:text-[#0D9488] font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Login;
