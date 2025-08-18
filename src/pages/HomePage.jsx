import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCopy, FaShareFromSquare, FaHeart } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("authToken");
  const headers = token ? { Authorization: `Token ${token}` } : {};
  // const { quoteId } = useParams();

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/quotes/`, { headers })
      .then((response) => {
        setQuotes(response.data);
      })
      .catch(console.error);
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Quote copied to clipboard!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
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
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
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
    if (!localStorage.getItem("token")) {
      toast.error("You must be logged in to like a quote.", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }
    axios
      .post(
        `${apiUrl}/api/quotes/${quoteId}/like/`,
        {},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((response) => {
        setQuotes((prevQuotes) =>
          prevQuotes.map((q) => (q.id === quoteId ? response.data : q))
        );
      })
      .catch(() => {
        toast.error("Error liking quote", {
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
          toast.error("You must be logged in to delete a quote.", {
            position: "top-center",
            autoClose: 2000,
            theme: "dark",
          });
        });
    }
  };

  return (
    <section className="min-h-screen bg-black text-white p-4">
      <h1 className="text-xl font-bold mb-4">Quote Feed</h1>
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="p-4 mb-4 rounded-lg shadow-md shadow-orange-500 relative"
        >
          <p className="text-sm">{quote.text}</p>
          <p className="text-xs text-gray-500">By {quote.user}</p>
          <div className="mt-2 flex space-x-2">
            <button
              onClick={() => handleCopy(quote.text)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              title="Copy Quote"
            >
              <FaCopy />
            </button>
            <button
              onClick={() => handleShare(quote.id)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-blue-600 transition"
              title="Share Quote"
            >
              <FaShareFromSquare />
            </button>
            <button
              onClick={() => handleLike(quote.id)}
              className="flex items-center space-x-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              title={quote.is_liked ? "Unlike" : "Like"}
            >
              <FaHeart
                className={`transition-colors duration-300 ${
                  quote.is_liked ? "text-red-500" : "text-white"
                }`}
              />
              <span>{quote.likes_count}</span>
            </button>
            {quote.is_owner && (
              <>
                <button
                  onClick={() => {
                    navigate(`/update/${quote.id}`);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(quote.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  title="Delete Quote"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      <ToastContainer />
    </section>
  );
};

export default HomePage;
