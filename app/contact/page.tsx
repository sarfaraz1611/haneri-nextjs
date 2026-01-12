"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <main className="main mt-20">
  

      <div className="contact_section py-10">
        {/* Contact Section */}
        <div className="contact_101 container flex flex-col lg:flex-row gap-8 items-center">
          <div className="contact_102 w-full lg:w-1/2">
            <Image
              src="/images/contact_image.png"
              alt="Family"
              width={600}
              height={500}
              className="contact_103 w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="contact_104 w-full lg:w-1/2">
            <h2 className="contact_105 heading1 mb-6">Get In Touch</h2>
            <form className="contact_106" onSubmit={handleSubmit}>
              <div className="contact_107 flex flex-col sm:flex-row gap-4 mb-4">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="contact_108 flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#315859] transition-colors"
                  placeholder="Full Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact_109 flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#315859] transition-colors"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="contact_110 flex flex-col sm:flex-row gap-4 mb-4">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="contact_111 flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#315859] transition-colors"
                  placeholder="Phone Number"
                  required
                />
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="contact_112 flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#315859] transition-colors"
                  placeholder="Your Message"
                  required
                />
              </div>
              <button
                type="submit"
                className="contact_113 btn-haneri px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="mb-8"></div>

        {/* Map Section */}
        <div className="contact_114 container h-[400px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3502.9191005485295!2d77.35124647549972!3d28.602203675681356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM2JzA3LjkiTiA3N8KwMjEnMTMuOCJF!5e0!3m2!1sen!2sin!4v1754734913098!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>
      </div>

      <div className="mb-8"></div>
    </main>
  );
}
