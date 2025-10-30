import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-black text-brand-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://images.squarespace-cdn.com/content/v1/6452437a9c32675e48bf7484/39065356-6fba-4236-a0e2-49d09cc5a994/David+Clunie+Logo.png"
              alt="David Clunie Coaching"
              className="h-12 w-auto"
            />
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right space-y-2">
            <h3 className="font-heading text-lg font-semibold">
              {t("footer.companyName")}
            </h3>
            <div className="font-body text-sm space-y-1">
              <p>
                Tel:{" "}
                <a
                  href={`tel:+442771584437`}
                  className="hover:text-accent transition-colors"
                >
                  {t("footer.tel")}
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${t("footer.email")}`}
                  className="hover:text-accent transition-colors"
                >
                  {t("footer.email")}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-accent mt-8 pt-8 text-center text-sm font-body text-light-accent">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
