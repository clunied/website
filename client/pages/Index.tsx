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
    </div>
  );
}
