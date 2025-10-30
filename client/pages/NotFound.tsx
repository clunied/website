import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light-accent to-brand-white">
      <div className="text-center px-4">
        <h1 className="font-heading text-h1 font-bold text-brand-black mb-4">
          404
        </h1>
        <p className="font-body text-lg-text text-brand-black mb-8">
          Page not found. This page doesn't exist yet. Continue customizing it
          in the chat if you'd like to add it.
        </p>
        <Link
          to="/"
          className="inline-block bg-dark-accent text-brand-white px-6 py-2 rounded font-meta font-semibold hover:bg-opacity-90 transition-all"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
