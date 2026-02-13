import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaPlus, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#1E293B] border-b border-[#334155] backdrop-blur-sm bg-opacity-98 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-[#14B8A6] hover:text-[#0D9488] transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-3xl">💬</span>
            iQuote
          </Link>
          <div className="flex gap-3 items-center">
            {isAuthenticated ? (
              <>
                <Link to="/form">
                  <button className="btn btn-ghost flex items-center gap-2">
                    <FaPlus className="text-sm" />
                    Post Quote
                  </button>
                </Link>
                <Link to="/profile">
                  <button className="btn btn-secondary flex items-center gap-2">
                    <FaUser className="text-sm" />
                    Profile
                  </button>
                </Link>
                <button onClick={handleLogout} className="btn btn-primary flex items-center gap-2">
                  <FaSignOutAlt className="text-sm" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-ghost flex items-center gap-2">
                    <FaSignInAlt className="text-sm" />
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-primary flex items-center gap-2">
                    <FaUserPlus className="text-sm" />
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-between items-center md:hidden">
          <Link
            to="/"
            className="text-2xl font-bold text-[#14B8A6] flex items-center gap-2"
          >
            <span className="text-2xl">💬</span>
            iQuote
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl p-3 hover:bg-[#334155] rounded-lg transition-all duration-200 text-[#F8FAFC]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1E293B] border-t border-[#334155] fade-in shadow-xl">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/form" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn btn-ghost w-full justify-start flex items-center gap-3">
                    <FaPlus />
                    Post Quote
                  </button>
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn btn-secondary w-full justify-start flex items-center gap-3">
                    <FaUser />
                    Profile
                  </button>
                </Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="btn btn-primary w-full justify-start flex items-center gap-3">
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn btn-ghost w-full justify-start flex items-center gap-3">
                    <FaSignInAlt />
                    Login
                  </button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn btn-primary w-full justify-start flex items-center gap-3">
                    <FaUserPlus />
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </nav>
  );
};

export default Header;

