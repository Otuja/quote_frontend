import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { GoArrowLeft } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OtpVerify = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);

  const username = state?.username || localStorage.getItem("registerUsername");

  useEffect(() => {
    if (!username) {
      toast.error("Username not found. Please register again.");
      navigate("/register");
    }
  }, [username, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await axios.post(`${apiUrl}/api/account/verify-otp/`, {
        username,
        otp_code: otp,
      });

      localStorage.removeItem("registerUsername");
      toast.success(res.data.message || "Account verified successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errorMsg =
        err?.response?.data?.otp_code?.[0] ||
        err?.response?.data?.error ||
        "OTP verification failed";
      toast.error(errorMsg);
    } finally {
      setVerifying(false);
    }
  };

  const resendOTP = async () => {
    setResending(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await axios.post(`${apiUrl}/api/account/resend-otp/`, {
        username,
      });
      toast.success(res.data.message || "OTP resent successfully.");
    } catch (err) {
      const errorMsg = err?.response?.data?.error || "Failed to resend OTP.";
      toast.error(errorMsg);
    } finally {
      setResending(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-between md:items-center md:justify-center bg-black text-white">
      <div className="flex flex-col md:flex-row md:max-w-4xl  md:rounded-3xl md:shadow-2xl md:overflow-hidden">
        {/* Left Side */}
        <div className="md:w-1/2  md:p-10 md:flex md:flex-col md:justify-between">
          <div className="p-8 md:p-0 flex items-center justify-between">
            <button onClick={() => navigate("/register")} className="text-2xl">
              <GoArrowLeft />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="font-semibold hover:underline"
            >
              Login
            </button>
          </div>
          <div className="space-y-4 p-8 md:mt-10 md:p-0">
            <h1 className="text-3xl md:text-4xl font-semibold ">Verify OTP</h1>
            <p className="text-sm md:text-base ">
              Enter the 6-digit OTP sent to your email to verify your account.
              This ensures your identity and secures your profile.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 rounded-t-4xl  p-8 md:p-10 md:w-1/2">
          <form onSubmit={handleVerify} className="space-y-6">
            <input
              type="text"
              placeholder="OTP Code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="py-4 px-5  w-full rounded-full md:rounded-lg border border-orange-500"
            />
            <button
              type="submit"
              className="py-4 px-5 w-full rounded-full md:rounded-lg border border-orange-500"
              disabled={verifying}
            >
              {verifying ? "Verifying..." : "Verify OTP"}
            </button>
            <div className="text-sm text-center ">
              Didn’t receive the OTP?{" "}
              <button
                type="button"
                onClick={resendOTP}
                disabled={resending}
                className="text-green-600 hover:underline font-semibold"
              >
                {resending ? "Resending..." : "Resend OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default OtpVerify;
