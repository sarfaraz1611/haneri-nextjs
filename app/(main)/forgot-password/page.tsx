"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatusMessage("");
    setTempPassword("");
    setLoading(true);

    try {
      const res = await fetch("https://api.haneri.com/api/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.temporary_password) {
        setTempPassword(data.temporary_password);
        setStatusMessage(data.message || "Temporary password generated successfully.");
        // Start countdown
        let seconds = 60;
        setCountdown(seconds);
        const timer = setInterval(() => {
          seconds--;
          setCountdown(seconds);
          if (seconds <= 0) {
            clearInterval(timer);
            setTempPassword("");
            setCountdown(null);
          }
        }, 1000);
      } else if (res.ok) {
        setStatusMessage(data.message || "Password reset link sent to your email.");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tempPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen mt-20 flex">
      {/* Left Panel — brand / image (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#244a46] flex-col items-center justify-center overflow-hidden">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/Slider2.jpg"
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        {/* Brand content */}
        <div className="relative z-10 text-center px-12">
          <img
            src="/images/logo_white.png"
            alt="Haneri"
            className="h-16 w-auto mx-auto mb-10"
          />
          <p className="text-white/70 text-base max-w-xs mx-auto leading-relaxed">
            India&apos;s leading premium fan brand. Reset your password to
            regain access.
          </p>
        </div>
      </div>

      {/* Right Panel — forgot password form */}
      <div className="flex-1 flex items-center justify-center py-12 px-6 bg-white">
        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <h2 className="font-heading font-semibold text-[32px] text-[#005d5a]">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your email to reset your password
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-5">
            <strong>Lost your password?</strong>
            <br />
            Please enter your username or email address. You will receive a link
            to create a new password via email.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="reset-email"
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                Username or email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="reset-email"
                className="w-full px-3.5 py-3 border border-gray-300 rounded-md text-sm font-[inherit] outline-none transition-colors duration-200 focus:border-[#005d5a] focus:ring-2 focus:ring-[#005d5a]/10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-1 mb-5 text-sm text-gray-600">
              <span>Remember Password?</span>
              <Link
                href="/login"
                className="text-gray-800 font-semibold hover:text-[#005d5a] transition-colors"
              >
                Login
              </Link>
              <span>here</span>
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#244a46] text-white rounded-[10px] font-bold text-[15px] tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#1a3634] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "RESETTING..." : "RESET PASSWORD"}
            </button>
          </form>

          {statusMessage && (
            <p className="text-green-600 text-sm mt-4 text-center">{statusMessage}</p>
          )}

          {tempPassword && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Temporary Password Generated
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Please copy the password. This is auto-generated for security
                reasons. Change your password after login. Thank you.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={tempPassword}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-white outline-none"
                />
                <button
                  type="button"
                  className="px-4 py-2 text-sm border border-gray-800 rounded-md text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
                  onClick={handleCopy}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                {countdown !== null && (
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {countdown}s
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
