"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileError, setMobileError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://api.haneri.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.data?.token) {
        localStorage.setItem("auth_token", data.data.token);
        window.location.href = "/";
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLogin = () => {
  //   window.location.href = "https://api.haneri.com/api/google";
  // };

  const handleOtpLogin = () => {
    setShowOtpModal(true);
    setOtpStep("mobile");
    setMobileNumber("");
    setMobileError("");
    setOtpValues(["", "", "", "", "", ""]);
    setOtpError("");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newValues = [...otpValues];
    newValues[index] = value.slice(-1);
    setOtpValues(newValues);
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      setOtpError("Please enter the complete 6-digit OTP.");
      return;
    }
    setOtpError("");
    setVerifyLoading(true);

    try {
      const cleaned = mobileNumber.replace(/\s/g, "");
      const res = await fetch(`https://api.haneri.com/api/login/${otp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ mobile: cleaned }),
      });

      const data = await res.json();

      if (res.ok && data.data?.token) {
        localStorage.setItem("auth_token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        window.location.href = "/";
      } else {
        setOtpError(data.message || "Invalid OTP. Please try again.");
      }
    } catch {
      setOtpError("Something went wrong. Please try again.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpError("");
    setOtpValues(["", "", "", "", "", ""]);
    await handleSendOtp();
    setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
  };

  const [otpLoading, setOtpLoading] = useState(false);
  const [otpStep, setOtpStep] = useState<"mobile" | "verify">("mobile");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSendOtp = async () => {
    const cleaned = mobileNumber.replace(/\s/g, "");
    if (!/^\d{10}$/.test(cleaned)) {
      setMobileError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setMobileError("");
    setOtpLoading(true);

    try {
      const res = await fetch("https://api.haneri.com/api/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ mobile: cleaned }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpStep("verify");
        setOtpValues(["", "", "", "", "", ""]);
        setOtpError("");
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
      } else {
        setMobileError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch {
      setMobileError("Something went wrong. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh]  mt-20 flex items-center justify-center py-10 px-4 bg-gray-50">
      <div className="w-full max-w-[480px] mx-auto bg-white rounded-[10px] p-9 shadow-[0_6px_14px_rgba(0,0,0,0.12)] max-sm:p-7">
        <div className="mb-6">
          <h2 className="font-heading font-semibold text-[32px] text-[#00473E]">
            Login
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="login-email"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Username or email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="login-email"
              className="w-full px-3.5 py-3 border border-gray-300 rounded-md text-sm font-[inherit] outline-none transition-colors duration-200 focus:border-[#00473E]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="login-password"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="login-password"
                className="w-full px-3.5 py-3 pr-11 border border-gray-300 rounded-md text-sm font-[inherit] outline-none transition-colors duration-200 focus:border-[#00473E]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-gray-500 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5 text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-800">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#00473E] cursor-pointer"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            {/* <Link
              href="/forgot-password"
              className="text-gray-800 font-semibold hover:text-[#00473E] transition-colors"
            >
              Forgot Password?
            </Link> */}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#244a46] text-white rounded-[10px] font-bold text-[15px] tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#1a3634] disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>

          <div className="flex items-center my-5 gap-3">
            <span className="flex-1 h-px bg-gray-300"></span>
            <span className="text-xs text-gray-400 uppercase">or</span>
            <span className="flex-1 h-px bg-gray-300"></span>
          </div>

          <button
            type="button"
            className="w-full py-3 border-2 border-[#00473E] rounded-md bg-transparent text-[#00473E] text-sm font-bold cursor-pointer mb-3 transition-all duration-300 font-[inherit] hover:bg-[#00473E] hover:text-white"
            onClick={handleOtpLogin}
          >
            Login with OTP
          </button>

          {/* <button
            type="button"
            className="w-full py-3 border border-gray-300 rounded-md bg-white flex items-center justify-center gap-2.5 text-sm font-semibold text-gray-800 cursor-pointer transition-all duration-300 font-[inherit] hover:border-gray-400 hover:bg-gray-50"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={20} />
            <span>Continue With Google</span>
          </button> */}

          <p className="mt-5 text-center text-sm text-gray-500">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/register"
              className="text-[#00473E] font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>

        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
        )}
      </div>

      {/* OTP Mobile Number Modal */}
      {showOtpModal && otpStep === "mobile" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-8 w-full max-w-[400px] mx-4 shadow-2xl">
            <h4 className="text-xl font-semibold text-[#00473E] mb-2">
              Login using OTP
            </h4>
            <p className="text-sm text-gray-600 mb-1">
              Enter your mobile number to receive a secure 6-digit code.
            </p>
            <p className="text-xs text-gray-400 mb-5">
              We&apos;ll send the OTP on WhatsApp/SMS to your number.
            </p>

            <label className="block text-[13px] font-medium text-gray-600 mb-1.5">
              Mobile Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:border-[#00473E] transition-colors">
              <span className="px-3 py-3 bg-gray-50 text-sm text-gray-600 border-r border-gray-300">
                +91
              </span>
              <input
                type="tel"
                className="flex-1 px-3 py-3 text-sm outline-none"
                placeholder="9876543210"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                maxLength={10}
              />
            </div>

            {mobileError && (
              <p className="mt-2 text-[13px] text-red-500">{mobileError}</p>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => setShowOtpModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-5 py-2 text-sm bg-[#00473E] text-white rounded-md font-semibold hover:bg-[#1a3634] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleSendOtp}
                disabled={otpLoading}
              >
                {otpLoading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verify Code Modal */}
      {showOtpModal && otpStep === "verify" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-8 w-full max-w-[400px] mx-4 shadow-2xl">
            <h4 className="text-xl font-semibold text-[#00473E] mb-2">
              Enter OTP
            </h4>
            <p className="text-sm text-gray-600 mb-1">
              We have sent a 6-digit code to your mobile number.
            </p>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Sent to +91 {mobileNumber.replace(/(\d{5})(\d{5})/, "$1 $2")}
            </p>
            <button
              type="button"
              className="text-[13px] text-[#00473E] font-semibold hover:underline mb-5 cursor-pointer"
              onClick={() => setOtpStep("mobile")}
            >
              Change number
            </button>

            <div className="flex justify-center gap-2.5 mb-4">
              {otpValues.map((val, i) => (
                <input
                  key={i}
                  ref={(el) => { otpInputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-11 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md outline-none transition-colors focus:border-[#00473E]"
                  value={val}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                />
              ))}
            </div>

            {otpError && (
              <p className="mt-2 text-[13px] text-red-500 text-center">{otpError}</p>
            )}

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                className="text-sm text-[#00473E] font-semibold hover:underline cursor-pointer"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
              <button
                type="button"
                className="px-6 py-2 text-sm bg-[#00473E] text-white rounded-md font-semibold hover:bg-[#1a3634] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleVerifyOtp}
                disabled={verifyLoading}
              >
                {verifyLoading ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
