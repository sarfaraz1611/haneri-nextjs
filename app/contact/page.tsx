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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (name: string, value: string): string => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Full name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
        return "";
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^\+?[\d\s-]{7,15}$/.test(value)) return "Please enter a valid phone number";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    const allTouched: Record<string, boolean> = {};
    for (const [key, value] of Object.entries(formData)) {
      newErrors[key] = validate(key, value);
      allTouched[key] = true;
    }
    setErrors(newErrors);
    setTouched(allTouched);
    if (Object.values(newErrors).some((err) => err)) return;
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
                <div className="flex-1">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`contact_108 w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#315859] transition-colors ${errors.fullName && touched.fullName ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Full Name"
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`contact_109 w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#315859] transition-colors ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Email"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="contact_110 flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`contact_111 w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#315859] transition-colors ${errors.phone && touched.phone ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Phone Number"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  className={`contact_112 w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#315859] transition-colors resize-none ${errors.message && touched.message ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Your Message"
                />
                {errors.message && touched.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
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
