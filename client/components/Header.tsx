import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-brand-white border-b border-light-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="https://images.squarespace-cdn.com/content/v1/6452437a9c32675e48bf7484/39065356-6fba-4236-a0e2-49d09cc5a994/David+Clunie+Logo.png"
            alt="David Clunie Coaching"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/about"
            className="font-body text-brand-black hover:text-dark-accent transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="bg-dark-accent text-brand-white px-6 py-2 rounded hover:bg-opacity-90 transition-all font-meta font-semibold"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-brand-black" />
          ) : (
            <Menu className="w-6 h-6 text-brand-black" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-light-accent border-t border-accent">
          <div className="px-4 py-4 space-y-4">
            <Link
              to="/about"
              className="block font-body text-brand-black hover:text-dark-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block bg-dark-accent text-brand-white px-6 py-2 rounded hover:bg-opacity-90 transition-all font-meta font-semibold text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
