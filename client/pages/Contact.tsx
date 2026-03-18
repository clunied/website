import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="w-full bg-brand-white">
      {/* Hero Section */}
      <section className="bg-brand-black text-brand-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-h2 font-bold mb-4">Contact</h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Intro & Email */}
            <div>
              <p className="font-body text-lg-text text-brand-black mb-6 leading-relaxed">
                Get in touch to chat more about the kind of help you need.
              </p>
              <p className="font-body text-normal text-brand-black mb-8 leading-relaxed">
                You can contact me via the email below or send a message using
                the contact form on this page.
              </p>

              <div className="mb-8">
                <p className="font-heading font-semibold text-brand-black mb-2">
                  Email
                </p>
                <a
                  href="mailto:david@davidcluniecoaching.com?subject=Online%20Web%20Enquiry%3A%20David%20Clunie%20Coaching"
                  className="font-body text-dark-accent hover:underline"
                >
                  david@davidcluniecoaching.com
                </a>
              </div>

              <div className="mb-8">
                <p className="font-heading font-semibold text-brand-black mb-2">
                  Telephone
                </p>
                <a
                  href="tel:+447715848437"
                  className="font-body text-dark-accent hover:underline"
                >
                  +44 (0) 7715 848 437
                </a>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-body font-semibold text-brand-black mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-body font-semibold text-brand-black mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-body font-semibold text-brand-black mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-body font-semibold text-brand-black mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-dark-accent text-brand-white px-8 py-3 rounded font-meta font-semibold hover:bg-opacity-90 transition-all"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
