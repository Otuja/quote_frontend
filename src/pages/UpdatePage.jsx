import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePage = () => {
  const [text, setText] = useState("");
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("authToken");
  const headers = token ? { Authorization: `Token ${token}` } : {};

  useEffect(() => {
    if (!token) {
      toast.error("You must be logged in to edit a quote.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      navigate("/login");
      return;
    }

    axios
      .get(`${apiUrl}/api/quotes/${quoteId}/`, { headers })
      .then((response) => {
        console.log("Quote data:", response.data); // Debug: Log quote data
        setText(response.data.text);
      })
      .catch((error) => {
        console.error(
          "Error fetching quote:",
          error.response?.data,
          error.response?.status
        );
        toast.error(
          error.response?.status === 404
            ? "Quote not found."
            : error.response?.status === 403
            ? "You can only edit your own quotes."
            : "Error fetching quote.",
          {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
          }
        );
        navigate("/");
      });
  }, [quoteId, navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("You must be logged in to edit a quote.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      navigate("/login");
      return;
    }

    try {
      await axios.put(
        `${apiUrl}/api/quotes/${quoteId}/update/`,
        { text },
        { headers }
      );
      toast.success("Quote updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      navigate("/");
    } catch (error) {
      console.error(
        "Error updating quote:",
        error.response?.data,
        error.response?.status
      );
      let errorMessage = "Error updating quote.";
      if (error.response?.status === 403) {
        errorMessage = "You can only edit your own quotes.";
      } else if (error.response?.status === 401) {
        errorMessage = "Invalid or expired token. Please log in again.";
      } else if (error.response?.status === 400 && error.response?.data) {
        errorMessage = Object.values(error.response.data).flat().join(" ");
      }
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  return (
    <section className="min-h-screen bg-black text-white p-4">
      <h1 className="text-xl font-bold mb-4">Edit Quote</h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-lg shadow-md shadow-orange-500"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Quote text"
          className="w-full p-2 mb-2  text-white rounded"
          rows="4"
          maxLength="500"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-4 py-2 ml-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </form>
      <ToastContainer />
    </section>
  );
};

export default UpdatePage;
