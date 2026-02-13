import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuoteForm = () => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const maxLength = 500;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const token = localStorage.getItem("authToken");

      await axios.post(
        `${apiUrl}/api/quotes/create/`,
        { text },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      toast.success("Quote posted successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      toast.error("Failed to post quote. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen section">
      <div className="container max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-[#14B8A6] mb-2">
            Share a Quote
          </h1>
          <p className="text-[#94A3B8]">
            Inspire others with your favorite quote
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
                Share something inspiring ✨
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
                  Posting...
                </span>
              ) : (
                "Post Quote"
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

export default QuoteForm;
