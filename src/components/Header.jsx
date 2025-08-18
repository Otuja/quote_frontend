import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // unified token check
    setIsAuthenticated(!!token);
  }, []);

  // Logout function (with API call)
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("No active session found.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/login");
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      const res = await axios.post(
        `${apiUrl}/api/account/logout/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      localStorage.removeItem("authToken");
      toast.success(res.data.detail || "Logged out successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/"), 2000);
      setIsAuthenticated(false);
    } catch (err) {
      const message =
        err?.response?.data?.detail || "Logout failed. Please try again.";
      toast.error(message, { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <nav className="p-4 text-white bg-black border-b border-b-orange-500">
      {/* desktop nav */}
      <div className="hidden md:flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center text-2xl font-semibold cursor-pointer"
        >
          iQuote
        </Link>

        <div className="flex space-x-4 items-center">
          {isAuthenticated ? (
            <>
              <button className="shadow-sm py-2 px-6 rounded-2xl cursor-pointer">
                <Link to="/form">Post</Link>
              </button>
              <button className="shadow-sm py-2 px-6 rounded-2xl cursor-pointer">
                <Link to="/profile">Profile</Link>
              </button>
              <button
                onClick={handleLogout}
                className="border py-2 px-6 border-[#B6E63A] rounded-2xl cursor-pointer hover:bg-[#B6E63A] hover:text-black transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="shadow-sm py-2 px-6 rounded-2xl cursor-pointer">
                <Link to="/login">Login</Link>
              </button>
              <button className="border py-2 px-6 border-[#B6E63A] rounded-2xl cursor-pointer">
                <Link to="/register">Sign Up</Link>
              </button>
            </>
          )}
        </div>
      </div>

      {/* mobile nav */}
      <div className="flex justify-between md:hidden">
        <Link
          to="/"
          className="flex items-center text-2xl font-semibold cursor-pointer"
        >
          iQuote
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="cursor-pointer text-2xl"
        >
          <GiHamburgerMenu />
        </button>
      </div>

      {/* mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="flex flex-col font-bold mt-2">
          {isAuthenticated ? (
            <>
              <Link to="/form" className="cursor-pointer py-1">
                Post
              </Link>
              <Link
                to="/profile"
                className="text-[#B6E63A] cursor-pointer py-1"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-[#8653EF] to-[#B6E63A] text-transparent bg-clip-text cursor-pointer py-1 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[#B6E63A] cursor-pointer py-1">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-[#8653EF] to-[#B6E63A] text-transparent bg-clip-text cursor-pointer py-1"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}

      {/* Toast notifications */}
      <ToastContainer />
    </nav>
  );
};

export default Header;
