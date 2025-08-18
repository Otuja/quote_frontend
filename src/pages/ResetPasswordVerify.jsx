import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordVerify = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
    }
  }, [location.state]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!username.trim() || !otp.trim()) {
      toast.error("Please enter both username and OTP.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await axios.post(`${apiUrl}/api/account/verify-otp/`, {
        username,
        otp_code: otp,
        is_password_reset: true,
      });
      toast.success(res.data.detail, {
        position: "top-right",
        autoClose: 5000,
      });
      setTimeout(
        () => navigate("/password-reset/confirm", { state: { username } }),
        2000
      );
    } catch (err) {
      console.error("OTP verification error:", err.response || err);
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.non_field_errors?.[0] ||
        "Failed to verify OTP. Please try again.";
      toast.error(message, { position: "top-right", autoClose: 5000 });
    }
  };

  return (
    <section className="min-h-screen flex md:items-center md:justify-center bg-black text-white">
      <div className="flex flex-col md:flex-row md:max-w-4xl  md:rounded-3xl md:shadow-2xl md:overflow-hidden">
        <div className="md:w-1/2  md:p-10 md:flex md:flex-col md:justify-between">
          <div className="p-8 md:p-0 flex items-center justify-between">
            <button
              onClick={() => navigate("/password-reset/request")}
              className="text-2xl "
            >
              <GoArrowLeft />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="font-semibold hover:underline"
            >
              Sign In
            </button>
          </div>
          <div className="space-y-4 p-8 md:mt-10 md:p-0">
            <h1 className="text-3xl md:text-4xl font-semibold ">Verify OTP</h1>
            <p className="text-sm md:text-base">
              Enter the OTP sent to your email to verify your password reset
              request.
            </p>
          </div>
        </div>
        <div className="flex-1 p-8 rounded-t-4xl md:rounded-t-none md:p-10 md:w-1/2">
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="py-4 px-5 w-full rounded-full md:rounded-lg border border-orange-500"
            />
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="py-4 px-5 w-full rounded-full md:rounded-lg border border-orange-500"
            />
            <button
              type="submit"
              className="py-4 px-5 w-full rounded-full md:rounded-lg border border-orange-500"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ResetPasswordVerify;
