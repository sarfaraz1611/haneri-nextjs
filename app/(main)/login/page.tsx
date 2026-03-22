"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

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

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken(true);
      const { email, displayName: name, uid: google_uid } = result.user;

      const res = await fetch("https://api.haneri.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ auth_provider: "google", idToken, email, name, google_uid }),
      });

      const data = await res.json();

      if ((data.code === 200 || data.code === 201 || data.success) && data.data?.token) {
        const user = data.data.user || data.data;
        localStorage.setItem("auth_token", data.data.token);
        localStorage.setItem("user_name", user.name || "");
        localStorage.setItem("user_email", user.email || "");
        localStorage.setItem("user_mobile", user.mobile || "");
        localStorage.setItem("user_role", user.role || "");
        if (user.id) localStorage.setItem("user_id", user.id);
        window.location.href = "/";
      } else {
        setError(data.message || "Google login failed. Please try again.");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Something went wrong during Google login.");
    }
  };

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
          {/* <h1 className="font-heading text-white text-5xl font-bold mb-4 leading-tight">
            Welcome Back
          </h1> */}
          <p className="text-white/70 text-base max-w-xs mx-auto leading-relaxed">
            India&apos;s leading premium fan brand. Log in to continue your
            journey.
          </p>
        </div>
      </div>

      {/* Right Panel — login form */}
      <div className="flex-1 flex items-center justify-center py-12 px-6 bg-white">
        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <h2 className="font-heading font-semibold text-[32px] text-[#005d5a]">
              Login
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to your Haneri account
            </p>
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
                className="w-full px-3.5 py-3 border border-gray-300 rounded-md text-sm font-[inherit] outline-none transition-colors duration-200 focus:border-[#005d5a] focus:ring-2 focus:ring-[#005d5a]/10"
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
                  className="w-full px-3.5 py-3 pr-11 border border-gray-300 rounded-md text-sm font-[inherit] outline-none transition-colors duration-200 focus:border-[#005d5a] focus:ring-2 focus:ring-[#005d5a]/10"
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
                  className="w-4 h-4 accent-[#005d5a] cursor-pointer"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-gray-800 font-semibold hover:text-[#005d5a] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#244a46] text-white rounded-[10px] font-bold text-[15px] tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#1a3634] shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
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
              className="w-full py-3 border-2 border-[#005d5a] rounded-md bg-transparent text-[#005d5a] text-sm font-bold cursor-pointer mb-3 transition-all duration-300 font-[inherit] hover:bg-[#005d5a] hover:text-white"
              onClick={handleOtpLogin}
            >
              Login with OTP
            </button>

            <button
              type="button"
              className="w-full py-3 border border-gray-300 rounded-md bg-white flex items-center justify-center gap-2.5 text-sm font-semibold text-gray-800 cursor-pointer transition-all duration-300 font-[inherit] hover:border-gray-400 hover:bg-gray-50"
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={20} />
              <span>Continue With Google</span>
            </button>

            <p className="mt-5 text-center text-sm text-gray-500">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/register"
                className="text-[#005d5a] font-bold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* OTP Mobile Number Modal */}
      {showOtpModal && otpStep === "mobile" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-8 w-full max-w-[400px] mx-4 shadow-2xl">
            <h4 className="text-xl font-semibold text-[#005d5a] mb-2">
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
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:border-[#005d5a] transition-colors">
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
                className="px-5 py-2 text-sm bg-[#005d5a] text-white rounded-md font-semibold hover:bg-[#1a3634] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
            <h4 className="text-xl font-semibold text-[#005d5a] mb-2">
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
              className="text-[13px] text-[#005d5a] font-semibold hover:underline mb-5 cursor-pointer"
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
                  className="w-11 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md outline-none transition-colors focus:border-[#005d5a]"
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
                className="text-sm text-[#005d5a] font-semibold hover:underline cursor-pointer"
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
              <button
                type="button"
                className="px-6 py-2 text-sm bg-[#005d5a] text-white rounded-md font-semibold hover:bg-[#1a3634] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
