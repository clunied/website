import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-brand-black text-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Image */}
            <div className="order-2 md:order-1">
              <img
                src="https://images.squarespace-cdn.com/content/v1/6452437a9c32675e48bf7484/1683112833405-4N3LNXXGXSGI5YBQMCT1/White+Block.png"
                alt="David Clunie"
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Right: Text Content */}
            <div className="order-1 md:order-2">
              <h1 className="font-heading text-h2 font-bold mb-6 leading-tight">
                {t("about.heading")}
              </h1>
              <div className="font-body text-sm-text leading-relaxed space-y-4">
                <p>{t("about.paragraph1")}</p>
                <p>{t("about.paragraph2")}</p>
                <p>{t("about.paragraph3")}</p>
                <p>{t("about.paragraph4")}</p>
                <p>{t("about.paragraph5")}</p>
                <p>
                  {t("about.paragraph6")}{" "}
                  <Link
                    to="/contact"
                    className="text-dark-accent hover:underline font-semibold"
                  >
                    Get in touch
                  </Link>{" "}
                  today and let's have a chat about what that might look like
                  for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-brand-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-h3 font-bold text-brand-black mb-12 text-center">
            {t("about.servicesHeading")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {t("about.services", { returnObjects: true }).map(
              (service: { title: string; subtitle: string }, index: number) => (
                <div
                  key={index}
                  className="bg-brand-black text-brand-white p-8 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-heading text-h4 font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm-text text-light-accent">
                    {service.subtitle}
                  </p>
                </div>
              ),
            )}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              to="/contact"
              className="inline-block bg-dark-accent text-brand-white px-8 py-3 rounded font-meta font-semibold hover:bg-opacity-90 transition-all"
            >
              {t("about.contactMeCta")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
