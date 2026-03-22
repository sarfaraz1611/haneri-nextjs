"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import CheckoutProgressBar from "@/components/CheckoutProgressBar";
import EmptyCart from "@/components/EmptyCart";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.haneri.com/api";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

interface Address {
  id: number;
  name: string;
  contact_no: string;
  email?: string;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  is_default: boolean;
}

interface CartItem {
  id: number;
  product_name: string;
  variant_value?: string;
  selling_price: number | string;
  quantity: number;
  file_urls?: string[];
}

interface AddressFormData {
  name: string;
  contact_no: string;
  email: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

const emptyForm: AddressFormData = {
  name: "",
  contact_no: "",
  email: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  country: "India",
  postal_code: "",
};

const parsePrice = (price: number | string): number => {
  if (typeof price === "number") return price;
  return parseFloat(price.replace(/,/g, "")) || 0;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export default function CheckoutPage() {
  // Auth
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [tempId, setTempId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Data
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

  // Loading
  const [loading, setLoading] = useState(true);
  const [addressLoading, setAddressLoading] = useState(false);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addForm, setAddForm] = useState<AddressFormData>({ ...emptyForm });
  const [editForm, setEditForm] = useState<AddressFormData & { id?: number }>({ ...emptyForm });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // OTP
  const [otpStep, setOtpStep] = useState<"idle" | "sent" | "verifying">("idle");
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpMobile, setOtpMobile] = useState("");
  const [otpCallback, setOtpCallback] = useState<(() => void) | null>(null);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Coupon
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  // Shipping
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingLoading, setShippingLoading] = useState(false);

  // Order
  const [placingOrder, setPlacingOrder] = useState(false);

  // Flash
  const [flash, setFlash] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (flash) {
      const timer = setTimeout(() => setFlash(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  // Init — read localStorage once on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const tid = localStorage.getItem("temp_id");
    setAuthToken(token);
    setTempId(tid);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const token = authToken;
    const tid = tempId;
    fetchCart(token, tid);
    if (token) {
      fetchAddresses(token);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  const getAuthHeaders = (): Record<string, string> => {
    if (authToken) return { Authorization: `Bearer ${authToken}` };
    return {};
  };

  // ── Cart ──
  const fetchCart = async (token: string | null, tid: string | null) => {
    try {
      const payload: { cart_id?: string } = {};
      if (!token && tid) payload.cart_id = tid;
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch(`${BASE_URL}/cart/fetch`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data?.data) setCartItems(data.data);
      else if (Array.isArray(data)) setCartItems(data);
    } catch {
      console.error("Error fetching cart");
    } finally {
      setLoading(false);
    }
  };

  // ── Addresses ──
  const fetchAddresses = async (token?: string) => {
    const tok = token ?? authToken;
    try {
      setAddressLoading(true);
      const headers: Record<string, string> = {};
      if (tok) headers["Authorization"] = `Bearer ${tok}`;
      const res = await fetch(`${BASE_URL}/address`, { headers });
      const data = await res.json();
      if (data?.data && data.data.length > 0) {
        setAddresses(data.data);
        const defaultAddr = data.data.find((a: Address) => a.is_default) || data.data[0];
        setSelectedAddressId(defaultAddr.id);
        calculateShipping(defaultAddr.id);
      } else {
        setAddresses([]);
        setAddForm({ ...emptyForm });
        setFormError("");
        setFieldErrors({});
        setShowAddModal(true);
      }
    } catch {
      console.error("Error fetching addresses");
    } finally {
      setAddressLoading(false);
    }
  };

  const deleteAddress = async (id: number) => {
    try {
      const res = await fetch(`${BASE_URL}/address/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data?.message?.includes("success")) {
        fetchAddresses(authToken ?? undefined);
        setFlash({ type: "success", message: "Address deleted successfully" });
      } else {
        setFlash({ type: "error", message: "Failed to delete address" });
      }
    } catch {
      setFlash({ type: "error", message: "Failed to delete address" });
    }
  };

  const handleSelectAddress = (id: number) => {
    setSelectedAddressId(id);
    calculateShipping(id);
  };

  // ── Shipping ──
  const calculateShipping = async (addressId: number) => {
    try {
      setShippingLoading(true);
      const res = await fetch(`${BASE_URL}/shipping/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ address_id: addressId }),
      });
      const data = await res.json();
      if (data?.shipping_cost !== undefined) {
        setShippingCost(data.shipping_cost);
      } else {
        setShippingCost(0);
      }
    } catch {
      setShippingCost(0);
    } finally {
      setShippingLoading(false);
    }
  };

  // ── Form Validation ──
  const validateForm = (form: AddressFormData, requireEmail: boolean): string | null => {
    const errors: Record<string, string> = {};
    if (!form.name.trim()) errors.name = "Name is required";
    else if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
    else if (!/^[a-zA-Z\s.]+$/.test(form.name.trim())) errors.name = "Name can only contain letters, spaces and dots";

    if (!form.contact_no) errors.contact_no = "Mobile number is required";
    else if (!/^\d{10}$/.test(form.contact_no)) errors.contact_no = "Mobile number must be exactly 10 digits";
    else if (!/^[6-9]\d{9}$/.test(form.contact_no)) errors.contact_no = "Enter a valid Indian mobile number";

    if (requireEmail) {
      if (!form.email.trim()) errors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address";
    }

    if (!form.address_line1.trim()) errors.address_line1 = "Address Line 1 is required";
    else if (form.address_line1.trim().length < 5) errors.address_line1 = "Address must be at least 5 characters";
    else if (form.address_line1.length > 250) errors.address_line1 = "Address Line 1 must be within 250 characters";

    if (form.address_line2 && form.address_line2.length > 250) errors.address_line2 = "Address Line 2 must be within 250 characters";

    if (!form.city.trim()) errors.city = "City is required";
    else if (form.city.trim().length < 2) errors.city = "City must be at least 2 characters";
    else if (!/^[a-zA-Z\s]+$/.test(form.city.trim())) errors.city = "City can only contain letters and spaces";

    if (!form.state) errors.state = "State is required";
    if (!form.country) errors.country = "Country is required";

    if (!form.postal_code) errors.postal_code = "Pincode is required";
    else if (!/^\d{6}$/.test(form.postal_code)) errors.postal_code = "Pincode must be exactly 6 digits";

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return Object.values(errors)[0];
    return null;
  };

  // ── OTP Flow ──
  const requestOtp = async (mobile: string) => {
    const res = await fetch(`${BASE_URL}/request-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });
    return res.json();
  };

  const verifyOtp = async (mobile: string, otp: string) => {
    const res = await fetch(`${BASE_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp }),
    });
    return res.json();
  };

  const startOtpFlow = async (mobile: string, onVerified: () => void) => {
    setOtpMobile(mobile);
    setOtpValues(["", "", "", "", "", ""]);
    setOtpError("");
    setOtpCallback(() => onVerified);
    try {
      const res = await requestOtp(mobile);
      const msg = res?.message || "";
      const msgL = msg.toLowerCase();
      if (res?.success && msgL.includes("mobile already validated")) {
        setFlash({ type: "error", message: msg || "Mobile already registered, use another number." });
        return;
      }
      if (res?.success && msgL.includes("otp sent")) {
        setOtpStep("sent");
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
        return;
      }
      setFlash({ type: "error", message: msg || "Failed to request OTP" });
    } catch {
      setFlash({ type: "error", message: "Failed to request OTP" });
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newValues = [...otpValues];
    newValues[index] = value.slice(-1);
    setOtpValues(newValues);
    if (value && index < 5) otpInputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text");
    const digits = pasted.replace(/\D/g, "").slice(0, 6);
    if (digits.length === 6) {
      e.preventDefault();
      setOtpValues(digits.split(""));
      otpInputRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otp = otpValues.join("");
    if (!/^\d{6}$/.test(otp)) { setOtpError("Please enter a valid 6-digit OTP"); return; }
    setOtpStep("verifying");
    try {
      const res = await verifyOtp(otpMobile, otp);
      const msgL = (res?.message || "").toLowerCase();
      if (res?.success && (msgL.includes("otp verified successfully") || msgL.includes("otp already verified"))) {
        setOtpStep("idle");
        if (otpCallback) otpCallback();
        return;
      }
      setOtpError(res?.message || "OTP verification failed");
      setOtpStep("sent");
    } catch {
      setOtpError("OTP verification failed");
      setOtpStep("sent");
    }
  };

  const handleResendOtp = async () => {
    setOtpError("");
    setOtpValues(["", "", "", "", "", ""]);
    try {
      const res = await requestOtp(otpMobile);
      const msgL = (res?.message || "").toLowerCase();
      if (res?.success && msgL.includes("otp sent")) {
        setFlash({ type: "success", message: "OTP resent successfully" });
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
      } else {
        setOtpError(res?.message || "Failed to resend OTP");
      }
    } catch {
      setOtpError("Failed to resend OTP");
    }
  };

  // ── Add Address ──
  const handleAddAddress = async () => {
    const err = validateForm(addForm, !authToken);
    if (err) { setFormError(err); return; }
    setFormError("");
    setFormLoading(true);

    const addressData = {
      name: addForm.name,
      contact_no: addForm.contact_no,
      address_line1: addForm.address_line1,
      address_line2: addForm.address_line2 || null,
      city: addForm.city,
      state: addForm.state,
      country: addForm.country,
      postal_code: addForm.postal_code,
      is_default: true,
    };

    const proceedAfterOtp = async () => {
      try {
        let token = authToken;
        if (!token && tempId) {
          const makeRes = await fetch(`${BASE_URL}/make_user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: addForm.name,
              email: addForm.email,
              mobile: addForm.contact_no,
              cart_id: tempId,
            }),
          });
          const makeData = await makeRes.json();
          if (makeData.token && makeData.user) {
            localStorage.setItem("auth_token", makeData.token);
            localStorage.setItem("user_name", makeData.user.name);
            localStorage.setItem("user_email", makeData.user.email);
            localStorage.setItem("user_mobile", makeData.user.mobile);
            localStorage.setItem("user_role", makeData.user.role);
            if (makeData.password) localStorage.setItem("pwd_000", makeData.password);
            token = makeData.token;
            setAuthToken(token);
          } else {
            setFormError(makeData.message || "Failed to register user");
            setFormLoading(false);
            return;
          }
        }
        if (!token) { setFormError("User not logged in or cart session expired"); setFormLoading(false); return; }

        const res = await fetch(`${BASE_URL}/address/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(addressData),
        });
        const data = await res.json();
        if (data?.success || data?.message?.toLowerCase().includes("success")) {
          setShowAddModal(false);
          setAddForm({ ...emptyForm });
          setFlash({ type: "success", message: "Address added successfully" });
          fetchAddresses(authToken ?? undefined);
        } else {
          setFormError(data?.message || "Failed to add address");
        }
      } catch {
        setFormError("Something went wrong. Please try again.");
      } finally {
        setFormLoading(false);
      }
    };

    startOtpFlow(addForm.contact_no, proceedAfterOtp);
    setFormLoading(false);
  };

  // ── Edit Address ──
  const openEditModal = (address: Address) => {
    setEditForm({
      id: address.id,
      name: address.name,
      contact_no: address.contact_no,
      email: "",
      address_line1: address.address_line1,
      address_line2: address.address_line2 || "",
      city: address.city,
      state: address.state,
      country: address.country,
      postal_code: address.postal_code,
    });
    setFormError("");
    setFieldErrors({});
    setShowEditModal(true);
  };

  const handleEditAddress = async () => {
    const err = validateForm(editForm, false);
    if (err) { setFormError(err); return; }
    setFormError("");
    setFormLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/address/update/${editForm.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          name: editForm.name,
          contact_no: editForm.contact_no,
          address_line1: editForm.address_line1,
          address_line2: editForm.address_line2 || null,
          city: editForm.city,
          state: editForm.state,
          country: editForm.country,
          postal_code: editForm.postal_code,
          is_default: true,
        }),
      });
      const data = await res.json();
      if (data?.message?.includes("success")) {
        setShowEditModal(false);
        setFlash({ type: "success", message: "Address updated successfully" });
        fetchAddresses(authToken ?? undefined);
      } else {
        setFormError(data?.message || "Failed to update address");
      }
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  // ── Coupon ──
  const applyCoupon = async () => {
    if (!couponCode.trim()) { setCouponError("Enter a coupon code"); return; }
    setCouponError("");
    setCouponLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/coupons/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ coupon_code: couponCode }),
      });
      const data = await res.json();
      if (data?.success) {
        setCouponDiscount(data.discount || 0);
        setCouponApplied(true);
        setFlash({ type: "success", message: data.message || "Coupon applied" });
      } else {
        setCouponError(data?.message || "Invalid coupon code");
      }
    } catch {
      setCouponError("Failed to apply coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = async () => {
    try {
      await fetch(`${BASE_URL}/coupon/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ coupon_code: couponCode }),
      });
    } catch { /* ignore */ }
    setCouponCode("");
    setCouponDiscount(0);
    setCouponApplied(false);
    setCouponError("");
  };

  // ── Calculations ──
  const taxInclusiveSubtotal = cartItems.reduce((sum, item) => sum + parsePrice(item.selling_price) * item.quantity, 0);
  const subtotal = taxInclusiveSubtotal / 1.18;
  const tax = taxInclusiveSubtotal - subtotal;
  const total = taxInclusiveSubtotal + shippingCost - couponDiscount;

  // ── Place Order ──
  const placeOrder = async () => {
    if (!selectedAddressId) { setFlash({ type: "error", message: "Please select a delivery address" }); return; }
    if (cartItems.length === 0) { setFlash({ type: "error", message: "Your cart is empty" }); return; }
    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    if (!selectedAddress) { setFlash({ type: "error", message: "Selected address not found" }); return; }

    setPlacingOrder(true);
    try {
      const shippingAddressStr = [
        selectedAddress.name,
        selectedAddress.contact_no,
        selectedAddress.city,
        selectedAddress.state,
        selectedAddress.country,
        selectedAddress.postal_code,
        [selectedAddress.address_line1, selectedAddress.address_line2].filter(Boolean).join(" "),
      ].join(", ");

      const payload: Record<string, unknown> = {
        status: "pending",
        payment_status: "pending",
        shipping_address: shippingAddressStr,
        shipping_charge: shippingCost,
      };
      if (couponApplied && couponCode) payload.coupon_code = couponCode;

      const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data?.razorpay_order_id) {
        openRazorpay(data);
      } else if (data?.success) {
        setFlash({ type: "success", message: "Order placed successfully!" });
        window.location.href = "/order-complete";
      } else {
        setFlash({ type: "error", message: data?.message || "Failed to create order" });
      }
    } catch {
      setFlash({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setPlacingOrder(false);
    }
  };

  const openRazorpay = (orderData: Record<string, unknown>) => {
    const options = {
      key: orderData.razorpay_key as string,
      amount: orderData.razorpay_amount as number,
      currency: "INR",
      name: "Haneri",
      description: "Order Payment",
      image: "/images/razorpay.png",
      order_id: orderData.razorpay_order_id as string,
      handler: async (response: Record<string, string>) => {
        try {
          const verifyRes = await fetch(`${BASE_URL}/order/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...getAuthHeaders() },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData?.success) {
            window.location.href = "/order-complete";
          } else {
            setFlash({ type: "error", message: "Payment verification failed" });
          }
        } catch {
          setFlash({ type: "error", message: "Payment verification failed" });
        }
      },
      prefill: {
        name: localStorage.getItem("user_name") || "",
        email: localStorage.getItem("user_email") || "",
        contact: localStorage.getItem("user_mobile") || "",
      },
      theme: { color: "#005d5a" },
    };
    const rzp = new (window as unknown as Record<string, unknown> & { Razorpay: new (opts: typeof options) => { open: () => void } }).Razorpay(options);
    rzp.open();
  };

  const getProductImage = (item: CartItem) => {
    if (item.file_urls && item.file_urls.length > 0) return item.file_urls[0];
    return "/images/placeholder.png";
  };

  // ── Shared input style ──
  const inputClass = (field: string) =>
    `w-full px-3.5 py-3 border rounded-lg text-sm outline-none transition-colors font-heading ${
      fieldErrors[field] ? "border-red-400 focus:border-red-500 bg-red-50" : "border-gray-300 focus:border-[#005d5a] bg-white"
    }`;

  const clearFieldError = (field: string) => {
    if (fieldErrors[field]) setFieldErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const renderAddressForm = (form: AddressFormData, setForm: (f: AddressFormData) => void, showEmail: boolean) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Full Name *</label>
        <input type="text" placeholder="e.g. Ramesh Kumar" value={form.name}
          onChange={(e) => { setForm({ ...form, name: e.target.value }); clearFieldError("name"); }}
          className={inputClass("name")} />
        {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Mobile Number *</label>
        <div className={`flex border rounded-lg overflow-hidden transition-colors ${fieldErrors.contact_no ? "border-red-400" : "border-gray-300 focus-within:border-[#005d5a]"}`}>
          <span className="px-3 py-3 bg-gray-100 text-gray-600 text-sm font-semibold border-r border-gray-300 select-none">+91</span>
          <input type="text" placeholder="10-digit number" value={form.contact_no}
            onChange={(e) => { setForm({ ...form, contact_no: e.target.value.replace(/\D/g, "").slice(0, 10) }); clearFieldError("contact_no"); }}
            inputMode="numeric" maxLength={10}
            className="flex-1 px-3 py-3 text-sm outline-none bg-white font-heading" />
        </div>
        {fieldErrors.contact_no && <p className="text-xs text-red-500 mt-1">{fieldErrors.contact_no}</p>}
      </div>
      {showEmail && (
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Email Address *</label>
          <input type="email" placeholder="example@email.com" value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }); clearFieldError("email"); }}
            className={inputClass("email")} />
          {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
        </div>
      )}
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Address Line 1 *</label>
        <input type="text" placeholder="House no., Street, Locality" value={form.address_line1}
          onChange={(e) => { setForm({ ...form, address_line1: e.target.value.slice(0, 250) }); clearFieldError("address_line1"); }}
          maxLength={250} className={inputClass("address_line1")} />
        {fieldErrors.address_line1 && <p className="text-xs text-red-500 mt-1">{fieldErrors.address_line1}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Address Line 2 <span className="text-gray-400 normal-case">(optional)</span></label>
        <input type="text" placeholder="Landmark, Area, etc." value={form.address_line2}
          onChange={(e) => { setForm({ ...form, address_line2: e.target.value.slice(0, 250) }); clearFieldError("address_line2"); }}
          maxLength={250} className={inputClass("address_line2")} />
        {fieldErrors.address_line2 && <p className="text-xs text-red-500 mt-1">{fieldErrors.address_line2}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">City *</label>
        <input type="text" placeholder="City" value={form.city}
          onChange={(e) => { setForm({ ...form, city: e.target.value }); clearFieldError("city"); }}
          className={inputClass("city")} />
        {fieldErrors.city && <p className="text-xs text-red-500 mt-1">{fieldErrors.city}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Pincode *</label>
        <input type="text" placeholder="6-digit pincode" value={form.postal_code}
          onChange={(e) => { setForm({ ...form, postal_code: e.target.value.replace(/\D/g, "").slice(0, 6) }); clearFieldError("postal_code"); }}
          inputMode="numeric" maxLength={6} className={inputClass("postal_code")} />
        {fieldErrors.postal_code && <p className="text-xs text-red-500 mt-1">{fieldErrors.postal_code}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">State *</label>
        <select value={form.state}
          onChange={(e) => { setForm({ ...form, state: e.target.value }); clearFieldError("state"); }}
          className={inputClass("state")}>
          <option value="">Select State</option>
          {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {fieldErrors.state && <p className="text-xs text-red-500 mt-1">{fieldErrors.state}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Country *</label>
        <select value={form.country}
          onChange={(e) => { setForm({ ...form, country: e.target.value }); clearFieldError("country"); }}
          className={inputClass("country")}>
          <option value="India">India</option>
        </select>
        {fieldErrors.country && <p className="text-xs text-red-500 mt-1">{fieldErrors.country}</p>}
      </div>
    </div>
  );

  // ── Loading Skeleton ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] mt-20">
        <div className="bg-primary py-5">
          <div className="container mx-auto px-4 flex justify-center gap-10">
            {[1, 2, 3].map((i) => <div key={i} className="h-5 w-28 bg-white/20 rounded animate-pulse" />)}
          </div>
        </div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-28 bg-gray-100 rounded-lg"></div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              {[1, 2, 3, 4].map((i) => <div key={i} className="h-4 bg-gray-100 rounded mb-3" />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] mt-20 min-h-screen">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Flash Message */}
      {flash && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all duration-300 ${
          flash.type === "success" ? "bg-[#005d5a] text-white" : "bg-red-600 text-white"
        }`}>
          {flash.message}
        </div>
      )}

      <CheckoutProgressBar step={2} />

      <div className="container mx-auto px-4 py-10">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Delivery Address Card */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#e6f4f3] flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#005d5a]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <h2 className="text-base font-heading font-bold text-[#464646] uppercase tracking-wide">Delivery Address</h2>
                  </div>
                  <button
                    onClick={() => { setAddForm({ ...emptyForm }); setFormError(""); setFieldErrors({}); setShowAddModal(true); }}
                    className="flex items-center gap-1 text-sm font-semibold text-[#005d5a] hover:text-[#064d4d] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New
                  </button>
                </div>

                <div className="p-6">
                  {addressLoading ? (
                    <div className="space-y-3">
                      {[1, 2].map((i) => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}
                    </div>
                  ) : addresses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {addresses.map((address) => (
                        <label
                          key={address.id}
                          onClick={() => handleSelectAddress(address.id)}
                          className={`relative block rounded-xl p-4 cursor-pointer transition-all border-2 ${
                            selectedAddressId === address.id
                              ? "border-[#005d5a] bg-[#f0faf9]"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          {/* Selected badge */}
                          {selectedAddressId === address.id && (
                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#005d5a] flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                            </div>
                          )}
                          <p className="font-bold text-[#464646] text-sm pr-6">{address.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">+91 {address.contact_no}</p>
                          <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                            {address.address_line1}{address.address_line2 && `, ${address.address_line2}`}
                          </p>
                          <p className="text-xs text-gray-600">{address.city}, {address.state} - {address.postal_code}</p>
                          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                            <button
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); openEditModal(address); }}
                              className="text-xs px-3 py-1.5 rounded-lg border border-[#005d5a] text-[#005d5a] hover:bg-[#005d5a] hover:text-white transition-colors font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteAddress(address.id); }}
                              className="text-xs px-3 py-1.5 rounded-lg border border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition-colors font-semibold"
                            >
                              Delete
                            </button>
                          </div>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#f0faf9] flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#005d5a]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-[#464646] mb-1">No Address Found</h3>
                      <p className="text-sm text-gray-400 mb-4">Add your first shipping address to continue.</p>
                      <button
                        onClick={() => { setAddForm({ ...emptyForm }); setFormError(""); setFieldErrors({}); setShowAddModal(true); }}
                        className="px-6 py-2.5 bg-[#075E5E] text-white text-sm font-semibold rounded-xl hover:bg-[#064d4d] transition-colors"
                      >
                        + Add New Address
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-[#e6f4f3] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#005d5a]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                    </svg>
                  </div>
                  <h2 className="text-base font-heading font-bold text-[#464646] uppercase tracking-wide">
                    Order Items <span className="text-[#005d5a]">({cartItems.length})</span>
                  </h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Image src={getProductImage(item)} alt={item.product_name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#464646] truncate">{item.product_name}</p>
                        {item.variant_value && <p className="text-xs text-gray-400 mt-0.5">{item.variant_value}</p>}
                        <p className="text-xs text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-[#005d5a] text-sm whitespace-nowrap">
                        {formatPrice(parsePrice(item.selling_price) * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Order Summary ── */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm sticky top-24 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-base font-heading font-bold text-[#464646] uppercase tracking-wide">Order Summary</h2>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</span>
                    <span className="font-semibold text-[#464646]">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax (18% GST)</span>
                    <span className="font-semibold text-[#464646]">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className={`font-semibold ${shippingCost === 0 ? "text-green-600" : "text-[#464646]"}`}>
                      {shippingLoading
                        ? <span className="inline-block w-12 h-3 bg-gray-200 rounded animate-pulse" />
                        : shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  {couponApplied && couponDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Coupon Discount</span>
                      <span className="font-semibold">−{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                </div>

                {/* Coupon */}
                <div className="px-6 pb-4 border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Coupon Code</p>
                  {!couponApplied ? (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter code"
                          value={couponCode}
                          onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:border-[#005d5a] transition-colors font-heading"
                        />
                        <button
                          onClick={applyCoupon}
                          disabled={couponLoading}
                          className="px-4 py-2.5 bg-[#075E5E] text-white text-sm font-semibold rounded-lg hover:bg-[#064d4d] transition-colors disabled:opacity-50"
                        >
                          {couponLoading ? "..." : "Apply"}
                        </button>
                      </div>
                      {couponError && <p className="text-xs text-red-500 mt-1.5">{couponError}</p>}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2.5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-green-700 font-bold">{couponCode}</span>
                      </div>
                      <button onClick={removeCoupon} className="text-xs text-red-500 font-semibold hover:underline">Remove</button>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="px-6 py-4 border-t-2 border-dashed border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-[#464646]">Total Payable</span>
                    <span className="text-xl font-bold text-[#005d5a]">{formatPrice(total)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">Inclusive of all taxes</p>
                </div>

                {/* Place Order Button */}
                <div className="px-6 pb-6">
                  <button
                    onClick={placeOrder}
                    disabled={placingOrder || !selectedAddressId || cartItems.length === 0}
                    className="w-full bg-[#075E5E] hover:bg-[#064d4d] text-white font-bold py-4 rounded-xl transition-colors uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {placingOrder ? (
                      <>
                        <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        Proceed to Pay
                      </>
                    )}
                  </button>
                  {!selectedAddressId && (
                    <p className="text-xs text-red-500 text-center mt-2">Please select a delivery address to continue</p>
                  )}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <span className="text-xs text-gray-400">Secured by Razorpay</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* ── Add Address Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => { setShowAddModal(false); setFormError(""); }}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-heading font-bold text-[#005d5a]">Add New Address</h3>
              <button onClick={() => { setShowAddModal(false); setFormError(""); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {renderAddressForm(addForm, setAddForm, !authToken)}
              {formError && (
                <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <p className="text-sm text-red-600">{formError}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 px-6 pb-6">
              <button onClick={() => { setShowAddModal(false); setFormError(""); }}
                className="px-5 py-2.5 text-sm border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-semibold">
                Cancel
              </button>
              <button onClick={handleAddAddress} disabled={formLoading}
                className="px-6 py-2.5 text-sm bg-[#005d5a] text-white rounded-xl font-bold hover:bg-[#064d4d] transition-colors disabled:opacity-60 flex items-center gap-2">
                {formLoading && (
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                )}
                {formLoading ? "Saving..." : "Add Address"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Address Modal ── */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => { setShowEditModal(false); setFormError(""); }}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-heading font-bold text-[#005d5a]">Update Address</h3>
              <button onClick={() => { setShowEditModal(false); setFormError(""); }} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {renderAddressForm(editForm, (f) => setEditForm({ ...f, id: editForm.id }), false)}
              {formError && (
                <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                  <p className="text-sm text-red-600">{formError}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 px-6 pb-6">
              <button onClick={() => { setShowEditModal(false); setFormError(""); }}
                className="px-5 py-2.5 text-sm border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors font-semibold">
                Cancel
              </button>
              <button onClick={handleEditAddress} disabled={formLoading}
                className="px-6 py-2.5 text-sm bg-[#005d5a] text-white rounded-xl font-bold hover:bg-[#064d4d] transition-colors disabled:opacity-60 flex items-center gap-2">
                {formLoading && (
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                )}
                {formLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── OTP Modal ── */}
      {otpStep !== "idle" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            <div className="text-center mb-5">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#e6f4f3] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#005d5a]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3" />
                </svg>
              </div>
              <h4 className="text-lg font-heading font-bold text-[#464646]">Verify Mobile</h4>
              <p className="text-sm text-gray-500 mt-1">OTP sent to <span className="font-semibold text-[#464646]">+91 {otpMobile.replace(/^91/, "").replace(/(\d{5})(\d{5})/, "$1 $2")}</span></p>
              <button type="button" onClick={() => { setOtpStep("idle"); setOtpError(""); }}
                className="text-xs text-[#005d5a] font-semibold hover:underline mt-1">
                Change number
              </button>
            </div>

            <div className="flex justify-center gap-2.5 mb-4">
              {otpValues.map((val, i) => (
                <input
                  key={i}
                  ref={(el) => { otpInputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onPaste={i === 0 ? handleOtpPaste : undefined}
                  disabled={otpStep === "verifying"}
                  className="w-11 h-12 text-center text-lg font-bold border-2 rounded-xl outline-none transition-colors focus:border-[#005d5a] border-gray-200 disabled:bg-gray-50"
                />
              ))}
            </div>

            {otpError && <p className="text-xs text-red-500 text-center mb-3">{otpError}</p>}

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={otpStep === "verifying" || otpValues.join("").length !== 6}
              className="w-full py-3 bg-[#005d5a] text-white text-sm font-bold rounded-xl hover:bg-[#064d4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {otpStep === "verifying" ? "Verifying..." : "Verify OTP"}
            </button>

            <button type="button" onClick={handleResendOtp} disabled={otpStep === "verifying"}
              className="w-full text-sm text-[#005d5a] font-semibold hover:underline mt-3 text-center disabled:opacity-50">
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

