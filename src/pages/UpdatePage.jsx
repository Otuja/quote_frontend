import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePage = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const maxLength = 500;

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("authToken");

    axios
      .get(`${apiUrl}/api/quotes/${quoteId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setText(response.data.text);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to load quote");
        setLoading(false);
      });
  }, [quoteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      await axios.put(
        `${apiUrl}/api/quotes/${quoteId}/update/`,
        { text },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      toast.success("Quote updated successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error("Failed to update quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen section">
        <div className="container max-w-2xl mx-auto">
          <div className="card">
            <div className="skeleton h-32 mb-4"></div>
            <div className="skeleton h-10 w-32"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen section">
      <div className="container max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-[#14B8A6] mb-2">
            Edit Quote
          </h1>
          <p className="text-[#94A3B8]">
            Update your quote to make it even better
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card fade-in-delay-1">
          <div className="form-group">
            <label className="form-label">Your Quote</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your quote here..."
              className="textarea"
              rows="6"
              maxLength={maxLength}
              required
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-[#64748B]">
                Make it inspiring ✨
              </span>
              <span
                className={`text-sm font-medium ${
                  text.length > maxLength * 0.9
                    ? "text-[#F59E0B]"
                    : "text-[#94A3B8]"
                }`}
              >
                {text.length}/{maxLength}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting || !text.trim()}
              className="btn btn-primary flex-1"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="loading-spinner"></span>
                  Updating...
                </span>
              ) : (
                "Update Quote"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default UpdatePage;
