import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await axios.post(`${apiUrl}/api/account/register/`, formData);

      localStorage.setItem("registerUsername", formData.username);
      toast.success("Registration successful! Redirecting...");
      setTimeout(
        () => navigate("/otp", { state: { username: formData.username } }),
        1500
      );
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
            Join iQuote
          </h1>
          <p className="text-[#94A3B8]">
            Create an account to start sharing quotes
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="card fade-in-delay-1">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="input"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full mb-4"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading-spinner"></span>
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="text-center pt-4 border-t border-[#334155]">
            <p className="text-[#94A3B8]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#14B8A6] hover:text-[#0D9488] font-semibold transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Register;
