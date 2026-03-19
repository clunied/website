import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen bg-brand-black text-brand-white flex items-center justify-center px-4 py-20 md:py-0">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-h2 font-bold mb-6 leading-tight">
            {t("hero.welcome")}
          </h2>
          <h3 className="font-heading text-h4 font-semibold mb-8 tracking-wider">
            BUILD MUSCLE | MOVE BETTER | TRAIN WITH CONFIDENCE
          </h3>
          <p className="font-body text-lg-text leading-relaxed mb-12 text-light-accent">
            {t("hero.description")}
          </p>
          <div className="flex flex-col gap-8 justify-center items-center">
            <Button
              href="https://wa.me/447715848437"
              variant="primary"
              external
            >
              {t("hero.primaryCta")}
            </Button>
            <Button
              href="/about"
              variant="text"
              className="underline decoration-dark-accent underline-offset-4"
            >
              {t("hero.secondaryCta")}
            </Button>
          </div>
        </div>
      </section>

      {/* Science Led Section with Background */}
      <section
        className="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center py-20 md:py-0"
        style={{
          backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/6452437a9c32675e48bf7484/7641e0d5-eaae-45fb-9886-d35f3b268376/637525d59ffb3-1668621781.jpg')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-brand-black opacity-30"></div>

        {/* Content */}
        <div className="relative max-w-3xl mx-auto text-center px-4 z-10">
          <h2 className="font-heading text-h2 font-bold text-brand-white leading-tight">
            {t("section.headline")}
          </h2>
        </div>
      </section>
    </div>
  );
}
