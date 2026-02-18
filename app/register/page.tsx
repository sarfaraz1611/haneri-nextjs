"use client";

import { useState } from "react";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("customer");
  const [gstin, setGstin] = useState("");
  const [gstinStatus, setGstinStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const showGstin = role === "dealer";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (showGstin && gstin.length !== 15) {
      setError("Please enter a valid 15-digit GSTIN.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://api.haneri.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_provider:"email",
          name,
          mobile,
          email,
          password,
          role,
          ...(showGstin && { gstin }),
        }),
      });

      const data = await res.json();

      if (res.ok && data.data?.token) {
        localStorage.setItem("auth_token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        window.location.href = "/";
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLogin = () => {
  //   window.location.href = "https://api.haneri.com/api/auth/google";
  // };

  const validateGstin = (value: string) => {
    setGstin(value);
    if (value.length === 0) {
      setGstinStatus("");
    } else if (value.length === 15) {
      setGstinStatus("valid");
    } else {
      setGstinStatus("invalid");
    }
  };

  return (
    <div className="min-h-[80vh] mt-20 flex items-center justify-center py-10 px-4 bg-gray-50">
      <div className="w-full max-w-[480px] mx-auto bg-white rounded-[10px] p-9 shadow-[0_6px_14px_rgba(0,0,0,0.12)] max-sm:p-7">
        <div className="mb-6">
          <h2 className="font-heading font-semibold text-[32px] text-[#00473E]">
            Register
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="register-name"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="register-name"
              className="w-full px-3.5 py-3 border border-gray-300 rounded-md text-sm outline-none transition-colors duration-200 focus:border-[#00473E]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="register-mobile"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Mobile <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="register-mobile"
              className="w-full px-3.5 py-3 border border-gray-300 rounded-md text-sm outline-none transition-colors duration-200 focus:border-[#00473E]"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="register-email"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="register-email"
              className="w-full px-3.5 py-3 border border-gray-300 rounded-md text-sm outline-none transition-colors duration-200 focus:border-[#00473E]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="register-password"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="register-password"
                className="w-full px-3.5 py-3 pr-11 border border-gray-300 rounded-md text-sm outline-none transition-colors duration-200 focus:border-[#00473E]"
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

          <div className="mb-4">
            <label
              htmlFor="user-role"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              You are a
            </label>
            <select
              id="user-role"
              className="w-full px-3.5 py-3 border border-gray-300 rounded-md text-sm outline-none transition-colors duration-200 focus:border-[#00473E] bg-white"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="architect">Architect</option>
              <option value="dealer">Dealer</option>
            </select>
          </div>

          {showGstin && (
            <div className="mb-4">
              <label
                htmlFor="register-gstin"
                className="block text-sm font-semibold text-gray-800 mb-1.5"
              >
                GSTIN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="register-gstin"
                className="w-full px-3.5 py-3 border border-gray-300 rounded-md text-sm outline-none transition-colors duration-200 focus:border-[#00473E]"
                value={gstin}
                onChange={(e) => validateGstin(e.target.value.toUpperCase())}
                maxLength={15}
                placeholder="Enter 15-digit GSTIN"
                required
              />
              {gstinStatus && (
                <p
                  className={`mt-1.5 text-sm ${
                    gstinStatus === "valid" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {gstinStatus === "valid"
                    ? "Valid GSTIN format"
                    : "GSTIN must be 15 characters"}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#244a46] text-white rounded-[10px] font-bold text-[15px] tracking-wide cursor-pointer transition-all duration-300 hover:bg-[#1a3634] disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "REGISTERING..." : "REGISTER"}
          </button>

          {/* <div className="flex items-center my-5 gap-3">
            <span className="flex-1 h-px bg-gray-300"></span>
            <span className="text-xs text-gray-400 uppercase">or</span>
            <span className="flex-1 h-px bg-gray-300"></span>
          </div> */}

          {/* <button
            type="button"
            className="w-full py-3 border border-gray-300 rounded-md bg-white flex items-center justify-center gap-2.5 text-sm font-semibold text-gray-800 cursor-pointer transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button> */}

          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#00473E] font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>

        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
