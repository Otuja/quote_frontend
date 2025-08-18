import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuoteForm = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken"); // match login storage key
      if (!token) {
        toast.error("You must be logged in to post a quote.");
        return;
      }

      await axios.post(
        `${apiUrl}/api/quotes/create/`,
        { text }, // match serializer field name
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      toast.success("Quote posted successfully!");
      setText("");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const message =
        error?.response?.data?.detail || "Failed to post quote. Try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-black text-white">
      <h1 className="text-xl font-bold mb-4">Post a Quote</h1>
      <form
        onSubmit={handleSubmit}
        className="p-4 shadow-md shadow-orange-500 rounded-lg"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Drop your quote..."
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 shadow-md shadow-orange-500 rounded"
        >
          Post
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default QuoteForm;
