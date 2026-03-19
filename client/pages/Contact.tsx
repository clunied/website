import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div
      className="w-full relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/6452437a9c32675e48bf7484/7641e0d5-eaae-45fb-9886-d35f3b268376/637525d59ffb3-1668621781.jpg')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <h1 className="font-heading text-h2 font-bold text-brand-white mb-12">
            Contact
          </h1>

          {/* Contact Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Intro & Email */}
            <div>
              <p className="font-body text-lg-text text-brand-white mb-6 leading-relaxed">
                Get in touch to chat more about the kind of help you need.
              </p>
              <p className="font-body text-normal text-brand-white mb-8 leading-relaxed">
                You can contact me via the email below or send a message using
                the contact form on this page.
              </p>

              <div className="mb-8">
                <p className="font-heading font-semibold text-brand-white mb-2">
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
                <p className="font-heading font-semibold text-brand-white mb-2">
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
                {/* First Name and Last Name in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block font-body font-semibold text-brand-white mb-2"
                    >
                      First Name (required)
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black bg-brand-white"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block font-body font-semibold text-brand-white mb-2"
                    >
                      Last Name (required)
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black bg-brand-white"
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-body font-semibold text-brand-white mb-2"
                  >
                    Email (required)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black bg-brand-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-body font-semibold text-brand-white mb-2"
                  >
                    Subject (required)
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black bg-brand-white"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-body font-semibold text-brand-white mb-2"
                  >
                    Message (required)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-light-accent rounded focus:outline-none focus:border-dark-accent focus:ring-1 focus:ring-dark-accent font-body text-brand-black bg-brand-white resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-dark-accent text-brand-black px-8 py-3 rounded font-meta font-semibold hover:bg-opacity-90 transition-all"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
