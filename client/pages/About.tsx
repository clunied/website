import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-accent to-brand-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-h2 font-bold text-brand-black mb-4">
            About Page
          </h1>
          <p className="font-body text-lg-text text-brand-black mb-8">
            This page is currently a placeholder. Continue customizing it in the chat to build out your About page with more details about David Clunie Coaching.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-block bg-dark-accent text-brand-white px-6 py-2 rounded font-meta font-semibold hover:bg-opacity-90 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
