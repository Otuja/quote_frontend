import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordConfirm = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  const handleResetConfirm = async (e) => {
    e.preventDefault();
    if (!username.trim() || !newPassword.trim()) {
      toast.error("Please enter username and new password.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await axios.post(
        `${apiUrl}/api/account/password-reset/confirm/`,
        {
          username,
          new_password: newPassword,
        }
      );
      toast.success(res.data.detail, {
        position: "top-right",
        autoClose: 5000,
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Password reset confirm error:", err.response || err);
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.non_field_errors?.[0] ||
        "Failed to reset password. Please try again.";
      toast.error(message, { position: "top-right", autoClose: 5000 });
    }
  };

  return (
    <section className="min-h-screen flex md:items-center md:justify-center bg-black text-white">
      <div className="flex flex-col md:flex-row md:max-w-4xl md:rounded-3xl md:shadow-2xl md:overflow-hidden">
        <div className="md:w-1/2 md:p-10 md:flex md:flex-col md:justify-between">
          <div className="p-8 md:p-0 flex items-center justify-between">
            <button
              onClick={() => navigate("/password-reset/verify")}
              className="text-2xl "
            >
              <GoArrowLeft />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="font-semibold  hover:underline"
            >
              Sign In
            </button>
          </div>
          <div className="space-y-4 p-8 md:mt-10 md:p-0">
            <h1 className="text-3xl md:text-4xl font-semibold ">
              Confirm Password Reset
            </h1>
            <p className="text-sm md:text-base">
              Enter your username and new password to reset your password.
            </p>
          </div>
        </div>
        <div className="flex-1  p-8 rounded-t-4xl md:rounded-t-none md:p-10 md:w-1/2">
          <form onSubmit={handleResetConfirm} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-4 px-5 w-full rounded-full md:rounded-lg border border-orange-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="py-4 px-5 w-full rounded-full md:rounded-lg border border-orange-500"
            />
            <button
              type="submit"
              className="py-4 px-5  w-full rounded-full md:rounded-lg border border-orange-500"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ResetPasswordConfirm;
