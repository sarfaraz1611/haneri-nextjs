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
    <div className="min-h-[80vh] mt-20 flex items-center justify-center py-10 px-4 bg-gray-50">
      <div className="w-full max-w-[480px] mx-auto bg-white rounded-[10px] p-9 shadow-[0_6px_14px_rgba(0,0,0,0.12)] max-sm:p-7">
        <div className="mb-4">
          <h2 className="font-heading font-semibold text-[32px] text-[#00473E]">
            Forget Password
          </h2>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          <strong>Lost your password?</strong>
          <br />
          Please enter your username or email address. You will receive a link to
          create a new password via email.
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
              className="w-full px-3.5 py-3 border border-gray-300 rounded-md text-sm font-[inherit] outline-none transition-colors duration-200 focus:border-[#00473E]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-1 mb-5 text-sm text-gray-600">
            <span>Remember Password?</span>
            <Link
              href="/login"
              className="text-gray-800 font-semibold hover:text-[#00473E] transition-colors"
            >
              Login
            </Link>
            <span>here</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#244a46] text-white rounded-[10px] font-bold text-[15px] tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#1a3634] disabled:opacity-70 disabled:cursor-not-allowed"
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

        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
