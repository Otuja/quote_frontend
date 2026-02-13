import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCopy, FaShare, FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("authToken");
  const headers = token ? { Authorization: `Token ${token}` } : {};

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view your profile", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      navigate("/login");
      return;
    }

    axios
      .get(`${apiUrl}/api/quotes/user/`, { headers })
      .then((response) => {
        setQuotes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Quote copied to clipboard!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
        });
      })
      .catch(() => {
        toast.error("Failed to copy text", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      });
  };

  const handleShare = (id) => {
    const shareUrl = `${window.location.origin}/quote/${id}`;
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        toast.success("Share link copied!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
        });
      })
      .catch(() => {
        toast.error("Failed to copy share link", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      });
  };

  const handleLike = (quoteId) => {
    if (!token) {
      toast.error("You must be logged in to like a quote.", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    // Find the current quote to check if it's already liked
    const currentQuote = quotes.find((q) => q.id === quoteId);
    const isCurrentlyLiked = currentQuote?.is_liked;

    axios
      .post(
        `${apiUrl}/api/quotes/${quoteId}/like/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        setQuotes((prevQuotes) =>
          prevQuotes.map((q) => (q.id === quoteId ? response.data : q))
        );
        
        // Show appropriate message based on the action
        if (isCurrentlyLiked) {
          toast.info("Quote unliked", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            theme: "dark",
          });
        } else {
          toast.success("Quote liked! ❤️", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            theme: "dark",
          });
        }
      })
      .catch(() => {
        toast.error("Error updating like", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      });
  };

  const handleDelete = (quoteId) => {
    if (window.confirm("Delete this quote?")) {
      axios
        .delete(`${apiUrl}/api/quotes/${quoteId}/delete/`, { headers })
        .then(() => {
          setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
          toast.success("Quote deleted successfully", {
            position: "top-center",
            autoClose: 2000,
            theme: "dark",
          });
        })
        .catch(() => {
          toast.error("Failed to delete quote.", {
            position: "top-center",
            autoClose: 2000,
            theme: "dark",
          });
        });
    }
  };

  return (
    <section className="min-h-screen section">
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-[#14B8A6] mb-2">
            Your Quotes
          </h1>
          <p className="text-[#94A3B8]">
            Manage and view all your shared quotes
          </p>
        </div>

        {/* Quotes List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card">
                <div className="skeleton h-20 mb-4"></div>
                <div className="skeleton h-4 w-32"></div>
              </div>
            ))}
          </div>
        ) : quotes.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-[#94A3B8] text-lg mb-4">
              You haven't posted any quotes yet
            </p>
            <button
              onClick={() => navigate("/form")}
              className="btn btn-primary"
            >
              Post Your First Quote
            </button>
          </div>
        ) : (
          <div className="space-y-6 flex flex-col gap-y-10">
            {quotes.map((quote, index) => (
              <div
                key={quote.id}
                className="card card-hover fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Quote Content */}
                <div className="mb-4">
                  <p className="text-lg md:text-xl text-[#F8FAFC] leading-relaxed mb-3">
                    "{quote.text}"
                  </p>
                  <p className="text-sm text-[#94A3B8]">
                    — {quote.user}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCopy(quote.text)}
                    className="btn btn-sm btn-secondary btn-icon"
                    title="Copy Quote"
                  >
                    <FaCopy />
                  </button>
                  <button
                    onClick={() => handleShare(quote.id)}
                    className="btn btn-sm btn-secondary btn-icon"
                    title="Share Quote"
                  >
                    <FaShare />
                  </button>
                  <button
                    onClick={() => handleLike(quote.id)}
                    className="btn btn-sm btn-secondary flex items-center gap-2"
                    title={quote.is_liked ? "Unlike" : "Like"}
                  >
                    <FaHeart
                      className={`transition-colors ${
                        quote.is_liked ? "text-red-500" : "text-[#94A3B8]"
                      }`}
                    />
                    <span className="text-sm font-semibold">{quote.likes_count}</span>
                  </button>
                  <button
                    onClick={() => navigate(`/update/${quote.id}`)}
                    className="btn btn-sm btn-secondary btn-icon ml-auto"
                    title="Edit Quote"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(quote.id)}
                    className="btn btn-sm btn-secondary btn-icon hover:!bg-red-500 hover:!border-red-500"
                    title="Delete Quote"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default ProfilePage;
