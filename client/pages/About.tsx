import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-brand-black text-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Title */}
          <h1 className="font-heading text-h2 font-bold mb-6 leading-tight md:hidden">
            {t("about.heading")}
          </h1>

          {/* Image - appears on mobile after title */}
          <div className="md:hidden mb-8">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fd1ac218daa20400ba8f0d8055e0dbb23%2Fc9bc673ff1d541d48d17e9f29698491c?format=webp"
              alt="David Clunie"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Desktop and mobile layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <h1 className="font-heading text-h2 font-bold mb-6 leading-tight hidden md:block">
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
                  <Button href="/contact" variant="text">
                    Get in touch
                  </Button>{" "}
                  today and let's have a chat about what that might look like
                  for you.
                </p>
              </div>
            </div>

            {/* Right: Image - desktop only */}
            <div className="hidden md:block">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fd1ac218daa20400ba8f0d8055e0dbb23%2Fc9bc673ff1d541d48d17e9f29698491c?format=webp"
                alt="David Clunie"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-light-accent bg-opacity-10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-h3 font-bold text-brand-black mb-12 text-center">
            {t("about.servicesHeading")}
          </h2>

          <div className="flex flex-wrap gap-6 mb-12 justify-center">
            {t("about.services", { returnObjects: true }).map(
              (service: { title: string; subtitle: string }, index: number) => (
                <div
                  key={index}
                  className="bg-brand-white rounded-lg p-8 text-brand-black shadow-sm hover:shadow-md transition-shadow border border-light-accent border-opacity-30 w-full sm:w-80"
                  style={{ maxWidth: "300px" }}
                >
                  <h3 className="font-heading font-bold text-lg-text mb-4 text-brand-black">
                    {service.title}
                  </h3>
                  <p className="font-body text-normal text-brand-black leading-relaxed">
                    {service.subtitle}
                  </p>
                </div>
              ),
            )}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button href="/contact" variant="secondary">
              {t("about.contactMeCta")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
