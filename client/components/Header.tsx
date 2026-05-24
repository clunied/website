import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "./Button";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSolid = mobileMenuOpen || !transparent;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid ? "bg-brand-black shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        {/* Logo (UNCHANGED) */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="https://images.squarespace-cdn.com/content/v1/6452437a9c32675e48bf7484/39065356-6fba-4236-a0e2-49d09cc5a994/David+Clunie+Logo.png"
            alt="David Clunie Coaching"
            className="w-auto"
            style={{ height: "110px" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/about"
            className="font-body text-brand-white hover:text-light-accent transition-colors"
          >
            {t("nav.about")}
          </Link>

          <Button href="/contact" variant="secondary">
            {t("nav.contact")}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-brand-white" />
          ) : (
            <Menu className="w-6 h-6 text-brand-white" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-black/95 backdrop-blur">
          <div className="px-4 py-6 space-y-6 flex flex-col items-center">
            <Link
              to="/about"
              className="font-body text-brand-white hover:text-light-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>

            <Button
              href="/contact"
              variant="secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.contact")}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
