"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSiteMode } from "@/context/SiteModeContext";

export interface EnquiryModalProps {
  productId: string | number;
  productName: string;
  variantId: string | number;
  variantValue: string;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  mobile: string;
  email: string;
  enquiry: string;
}

const initialForm: FormData = {
  name: "",
  mobile: "",
  email: "",
  enquiry: "",
};

function validate(name: string, value: string): string {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      return "";
    case "mobile":
      if (!value.trim()) return "Mobile number is required";
      if (!/^\+?[\d\s-]{7,15}$/.test(value.trim()))
        return "Please enter a valid mobile number";
      return "";
    case "email":
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        return "Please enter a valid email";
      return "";
    case "enquiry":
      if (!value.trim()) return "Enquiry is required";
      if (value.trim().length < 10)
        return "Enquiry must be at least 10 characters";
      return "";
    default:
      return "";
  }
}

export default function EnquiryModal({
  productId,
  productName,
  variantId,
  variantValue,
  isOpen,
  onClose,
}: EnquiryModalProps) {
  const { enquiryUrl } = useSiteMode();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    setFormData(initialForm);
    setErrors({});
    setTouched({});
    setSubmitStatus(null);
    setIsSubmitting(false);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    if (!enquiryUrl) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const pageUrl =
      typeof window !== "undefined" ? window.location.href : "";

    const payload = {
      name: formData.name.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim(),
      enquiry: formData.enquiry.trim(),
      product_name: productName,
      product_id: String(productId),
      variant_id: String(variantId),
      variant: variantValue,
      page_url: pageUrl,
    };

    try {
      await fetch(enquiryUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close enquiry form"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <h2
            id="enquiry-modal-title"
            className="text-xl font-bold text-[#005d5a]"
          >
            Send Enquiry
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div className="rounded-xl bg-[#005d5a]/5 p-4 space-y-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Product
              </span>
              <p className="font-semibold text-[#CA5D27]">{productName}</p>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Variant
              </span>
              <p className="text-[#005d5a]">{variantValue || "—"}</p>
            </div>
          </div>

          {submitStatus === "success" && (
            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
              Your enquiry has been submitted. We will get back to you soon.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
              {!enquiryUrl
                ? "Enquiry service is not configured. Please contact us directly."
                : "Something went wrong. Please try again or contact us directly."}
            </div>
          )}

          {submitStatus !== "success" && (
            <>
              <Field
                label="Name"
                name="name"
                value={formData.name}
                error={touched.name ? errors.name : ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <Field
                label="Mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                error={touched.mobile ? errors.mobile : ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <Field
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                error={touched.email ? errors.email : ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <div>
                <label
                  htmlFor="enquiry"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Enquiry <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="enquiry"
                  name="enquiry"
                  rows={4}
                  value={formData.enquiry}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#005d5a] focus:ring-1 focus:ring-[#005d5a] ${
                    touched.enquiry && errors.enquiry
                      ? "border-red-400"
                      : "border-gray-200"
                  }`}
                  placeholder="Tell us about your requirement..."
                />
                {touched.enquiry && errors.enquiry && (
                  <p className="mt-1 text-xs text-red-500">{errors.enquiry}</p>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-[#005d5a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004744] disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Submit Enquiry"}
                </button>
              </div>
            </>
          )}

          {submitStatus === "success" && (
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-xl bg-[#005d5a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#004744]"
            >
              Close
            </button>
          )}
        </form>
      </div>
    </div>,
    document.body,
  );
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#005d5a] focus:ring-1 focus:ring-[#005d5a] ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
