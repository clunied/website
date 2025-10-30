import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen bg-brand-black text-brand-white flex items-center justify-center px-4 py-20 md:py-0">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-h1 font-bold mb-6 leading-tight">
            {t("hero.welcome")}
          </h1>
          <p className="font-body text-lg-text leading-relaxed mb-8 text-light-accent">
            {t("hero.description")}
          </p>
          <Link
            to="/about"
            className="inline-block bg-dark-accent text-brand-white px-8 py-3 rounded font-meta font-semibold hover:bg-opacity-90 transition-all"
          >
            {t("hero.cta")}
          </Link>
        </div>
      </section>

      {/* Tagline Section */}
      <section className="bg-brand-black text-brand-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-heading text-h4 font-semibold tracking-wider">
            {t("hero.tagline")}
          </p>
        </div>
      </section>

      {/* Science Led Section with Background */}
      <section className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center py-20 md:py-0"
        style={{
          backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/6452437a9c32675e48bf7484/7641e0d5-eaae-45fb-9886-d35f3b268376/637525d59ffb3-1668621781.jpg')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-brand-black opacity-30"></div>

        {/* Content */}
        <div className="relative max-w-3xl mx-auto text-center px-4 z-10">
          <h2 className="font-heading text-h2 font-bold text-brand-white mb-12 leading-tight">
            {t("section.headline")}
          </h2>

          <div className="bg-brand-white bg-opacity-95 p-8 md:p-12 rounded-lg">
            <img
              src="https://images.squarespace-cdn.com/content/v1/6452437a9c32675e48bf7484/39065356-6fba-4236-a0e2-49d09cc5a994/David+Clunie+Logo.png"
              alt="David Clunie Coaching"
              className="h-16 w-auto mx-auto mb-6"
            />
            <h3 className="font-heading text-h4 font-semibold text-brand-black mb-6">
              {t("footer.companyName")}
            </h3>
            <div className="font-body text-brand-black text-sm-text space-y-2">
              <p>
                Tel:{" "}
                <a
                  href="tel:+442771584437"
                  className="text-dark-accent hover:underline transition-colors"
                >
                  {t("footer.tel")}
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href={`mailto:${t("footer.email")}`}
                  className="text-dark-accent hover:underline transition-colors"
                >
                  {t("footer.email")}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
