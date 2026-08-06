import Button from "@/components/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const emailEndpoint = import.meta.env.VITE_EMAIL_ENDPOINT;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!emailEndpoint?.trim()) {
      setSubmitError(t("contact.errorNoEndpoint"));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(emailEndpoint.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          subject: t("contact.subjectLine"),
          message: formData.message,
        }),
      });

      if (!res.ok) {
        setSubmitError(t("contact.errorSendFailed"));
        return;
      }

      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setSubmitError(t("contact.errorSendFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoHref = `mailto:${t("footer.email")}?subject=${encodeURIComponent(t("contact.mailtoSubject"))}`;

  return (
    <div
      className="w-full relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/portrait.webp')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 pt-48 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h1 className="font-heading text-h2 font-bold text-brand-white mb-12">
            {t("contact.heading")}
          </h1>

          {/* Contact Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Intro & Email */}
            <div>
              <p className="font-body text-lg-text text-brand-white mb-6 leading-relaxed">
                {t("contact.intro1")}
              </p>

              <div className="p-8 text-center">
                <Button
                  href="https://wa.me/447715848437"
                  variant="primary"
                  external
                >
                  {t("hero.ctaWhatsapp")}
                </Button>
              </div>

              <p className="font-body text-normal text-brand-white mb-8 leading-relaxed">
                {t("contact.intro2")}
              </p>

              <div className="mb-8">
                <p className="font-heading font-semibold text-brand-white mb-2">
                  {t("contact.emailLabel")}
                </p>
                <a
                  href={mailtoHref}
                  className="font-body text-dark-accent hover:underline"
                >
                  {t("footer.email")}
                </a>
              </div>

              <div className="mb-8">
                <p className="font-heading font-semibold text-brand-white mb-2">
                  {t("contact.telLabel")}
                </p>
                <a
                  href="tel:+447715848437"
                  className="font-body text-dark-accent hover:underline"
                >
                  {t("footer.tel")}
                </a>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  {t("contact.successMessage")}
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* First Name and Last Name in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block font-body font-semibold text-brand-white mb-2"
                    >
                      {t("contact.firstNameLabel")}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black bg-brand-white"
                      placeholder={t("contact.firstNamePlaceholder")}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block font-body font-semibold text-brand-white mb-2"
                    >
                      {t("contact.lastNameLabel")}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black bg-brand-white"
                      placeholder={t("contact.lastNamePlaceholder")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-body font-semibold text-brand-white mb-2"
                  >
                    {t("contact.yourEmailLabel")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black bg-brand-white"
                    placeholder={t("contact.yourEmailPlaceholder")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-body font-semibold text-brand-white mb-2"
                  >
                    {t("contact.messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black bg-brand-white resize-none"
                    placeholder={t("contact.messagePlaceholder")}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-dark-accent text-brand-black px-8 py-3 rounded font-meta font-semibold hover:bg-opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? t("contact.sending") : t("contact.send")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
