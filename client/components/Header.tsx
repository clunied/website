import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import Button from "./Button";

export default function Header() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        {/* Logo */}
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
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        <div className="md:hidden bg-brand-black">
          <div className="px-4 py-4 space-y-4 flex flex-col items-center">
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
