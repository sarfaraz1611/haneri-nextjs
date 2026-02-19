"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.haneri.com";

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
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export default function CheckoutPage() {
  // Auth
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [tempId, setTempId] = useState<string | null>(null);

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

  // Login Modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Flash
  const [flash, setFlash] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (flash) {
      const timer = setTimeout(() => setFlash(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  // Init
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const tid = localStorage.getItem("temp_id");
    setAuthToken(token);
    setTempId(tid);
  }, []);

  useEffect(() => {
    if (authToken !== null || tempId !== null) {
      fetchCart();
      if (authToken) {
        fetchAddresses();
      } else {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, tempId]);

  const getAuthHeaders = (): Record<string, string> => {
    if (authToken) return { Authorization: `Bearer ${authToken}` };
    return {};
  };

  // ── Cart ──
  const fetchCart = async () => {
    try {
      const payload: { cart_id?: string } = {};
      if (!authToken && tempId) payload.cart_id = tempId;

      const res = await fetch(`${BASE_URL}/cart/fetch`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify(payload),
      });
      const data = await res.json()
      if (data?.data) setCartItems(data.data);
      else if (Array.isArray(data)) setCartItems(data);
    } catch {
      console.error("Error fetching cart");
    } finally {
      if (!authToken) setLoading(false);
    }
  };

  // ── Addresses ──
  const fetchAddresses = async () => {
    try {
      setAddressLoading(true);
      const res = await fetch(`${BASE_URL}/address`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data?.data && data.data.length > 0) {
        setAddresses(data.data);
        const defaultAddr = data.data.find((a: Address) => a.is_default);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
          calculateShipping(defaultAddr.id);
        } else {
          setSelectedAddressId(data.data[0].id);
          calculateShipping(data.data[0].id);
        }
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
      setLoading(false);
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
        fetchAddresses();
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
        // Fallback: free over ₹1000, else ₹99
        const subtotal = cartItems.reduce(
          (sum, item) => sum + parsePrice(item.selling_price) * item.quantity, 0
        );
        setShippingCost(subtotal > 1000 ? 0 : 99);
      }
    } catch {
      const subtotal = cartItems.reduce(
        (sum, item) => sum + parsePrice(item.selling_price) * item.quantity, 0
      );
      setShippingCost(subtotal > 1000 ? 0 : 99);
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

    if (Object.keys(errors).length > 0) {
      return Object.values(errors)[0];
    }
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
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
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
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Please enter a valid 6-digit OTP");
      return;
    }
    setOtpStep("verifying");
    try {
      const res = await verifyOtp(otpMobile, otp);
      const msg = res?.message || "";
      const msgL = msg.toLowerCase();

      if (res?.success && (msgL.includes("otp verified successfully") || msgL.includes("otp already verified"))) {
        setOtpStep("idle");
        if (otpCallback) otpCallback();
        return;
      }
      setOtpError(msg || "OTP verification failed");
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
      const msg = res?.message || "";
      const msgL = msg.toLowerCase();
      if (res?.success && msgL.includes("otp sent")) {
        setOtpError("");
        setFlash({ type: "success", message: "OTP resent successfully" });
        setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
      } else {
        setOtpError(msg || "Failed to resend OTP");
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

        // Guest user: create user first
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

        if (!token) {
          setFormError("User not logged in or cart session expired");
          setFormLoading(false);
          return;
        }

        const res = await fetch(`${BASE_URL}/address/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addressData),
        });
        const data = await res.json();

        if (data?.success || data?.message?.toLowerCase().includes("success")) {
          setShowAddModal(false);
          setAddForm({ ...emptyForm });
          setFlash({ type: "success", message: "Address added successfully" });
          fetchAddresses();
        } else {
          setFormError(data?.message || "Failed to add address");
        }
      } catch {
        setFormError("Something went wrong. Please try again.");
      } finally {
        setFormLoading(false);
      }
    };

    // Start OTP flow
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
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
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
        fetchAddresses();
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
    if (!authToken) { setShowLoginModal(true); return; }
    if (!couponCode.trim()) { setCouponError("Enter a coupon code"); return; }
    setCouponError("");
    setCouponLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/coupon/apply`, {
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
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.selling_price) * item.quantity, 0
  );
  const tax = subtotal * 0.18;
  const total = subtotal + tax + shippingCost - couponDiscount;

  // ── Place Order ──
  const placeOrder = async () => {
    if (!selectedAddressId) {
      setFlash({ type: "error", message: "Please select a delivery address" });
      return;
    }
    if (cartItems.length === 0) {
      setFlash({ type: "error", message: "Your cart is empty" });
      return;
    }

    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    if (!selectedAddress) {
      setFlash({ type: "error", message: "Selected address not found" });
      return;
    }

    setPlacingOrder(true);
    try {
      // Build shipping_address string: "name, phone, city, state, country, pincode, address"
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
      if (couponApplied && couponCode) {
        payload.coupon_code = couponCode;
      }

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
      theme: { color: "#00473E" },
    };

    const rzp = new (window as unknown as Record<string, unknown> & { Razorpay: new (opts: typeof options) => { open: () => void } }).Razorpay(options);
    rzp.open();
  };

  // ── Product Image ──
  const getProductImage = (item: CartItem) => {
    if (item.file_urls && item.file_urls.length > 0) return item.file_urls[0];
    return "/images/placeholder.png";
  };

  // ── Loading Skeleton ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]">
        <div className="bg-primary py-6">
          <div className="container mx-auto px-4">
            <div className="h-8 w-48 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg p-6 h-fit animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Address Form Inputs (reused in Add & Edit modals) ──
  const inputClass = (field: string) =>
    `w-full px-3.5 py-3 border rounded-md text-sm outline-none transition-colors ${
      fieldErrors[field] ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-[#00473E]"
    }`;

  const clearFieldError = (field: string) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const renderAddressForm = (
    form: AddressFormData,
    setForm: (f: AddressFormData) => void,
    showEmail: boolean
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <input
          type="text"
          placeholder="Name *"
          value={form.name}
          onChange={(e) => { setForm({ ...form, name: e.target.value }); clearFieldError("name"); }}
          className={inputClass("name")}
        />
        {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Contact No *"
          value={form.contact_no}
          onChange={(e) => { setForm({ ...form, contact_no: e.target.value.replace(/\D/g, "").slice(0, 10) }); clearFieldError("contact_no"); }}
          inputMode="numeric"
          maxLength={10}
          className={inputClass("contact_no")}
        />
        {fieldErrors.contact_no && <p className="text-xs text-red-500 mt-1">{fieldErrors.contact_no}</p>}
      </div>
      {showEmail && (
        <div className="sm:col-span-2">
          <input
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={(e) => { setForm({ ...form, email: e.target.value }); clearFieldError("email"); }}
            className={inputClass("email")}
          />
          {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
        </div>
      )}
      <div className="sm:col-span-2">
        <input
          type="text"
          placeholder="Address Line 1 *"
          value={form.address_line1}
          onChange={(e) => { setForm({ ...form, address_line1: e.target.value.slice(0, 250) }); clearFieldError("address_line1"); }}
          maxLength={250}
          className={inputClass("address_line1")}
        />
        {fieldErrors.address_line1 && <p className="text-xs text-red-500 mt-1">{fieldErrors.address_line1}</p>}
      </div>
      <div className="sm:col-span-2">
        <input
          type="text"
          placeholder="Address Line 2 (optional)"
          value={form.address_line2}
          onChange={(e) => { setForm({ ...form, address_line2: e.target.value.slice(0, 250) }); clearFieldError("address_line2"); }}
          maxLength={250}
          className={inputClass("address_line2")}
        />
        {fieldErrors.address_line2 && <p className="text-xs text-red-500 mt-1">{fieldErrors.address_line2}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="City *"
          value={form.city}
          onChange={(e) => { setForm({ ...form, city: e.target.value }); clearFieldError("city"); }}
          className={inputClass("city")}
        />
        {fieldErrors.city && <p className="text-xs text-red-500 mt-1">{fieldErrors.city}</p>}
      </div>
      <div>
        <select
          value={form.state}
          onChange={(e) => { setForm({ ...form, state: e.target.value }); clearFieldError("state"); }}
          className={inputClass("state")}
        >
          <option value="">Select State *</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {fieldErrors.state && <p className="text-xs text-red-500 mt-1">{fieldErrors.state}</p>}
      </div>
      <div>
        <select
          value={form.country}
          onChange={(e) => { setForm({ ...form, country: e.target.value }); clearFieldError("country"); }}
          className={inputClass("country")}
        >
          <option value="India">India</option>
        </select>
        {fieldErrors.country && <p className="text-xs text-red-500 mt-1">{fieldErrors.country}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Pincode *"
          value={form.postal_code}
          onChange={(e) => { setForm({ ...form, postal_code: e.target.value.replace(/\D/g, "").slice(0, 6) }); clearFieldError("postal_code"); }}
          inputMode="numeric"
          maxLength={6}
          className={inputClass("postal_code")}
        />
        {fieldErrors.postal_code && <p className="text-xs text-red-500 mt-1">{fieldErrors.postal_code}</p>}
      </div>
    </div>
  );

  return (
    <div className="bg-[#F5F5F5] mt-20 min-h-screen">
      {/* Flash Message */}
      {flash && (
        <div
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
            flash.type === "success" ? "bg-[#b3e3dd] text-[#00473E]" : "bg-red-100 text-red-700"
          }`}
        >
          {flash.message}
        </div>
      )}

      {/* Progress Bar */}
      {/* <div className="bg-primary py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <Link href="/cart" className="text-white/70 hover:text-white font-heading text-sm sm:text-base transition-colors">
              Shopping Cart
            </Link>
            <span className="text-white/40">―</span>
            <span className="text-white font-heading text-sm sm:text-base font-bold border-b-2 border-brand pb-1">
              Checkout
            </span>
            <span className="text-white/40">―</span>
            <span className="text-white/40 font-heading text-sm sm:text-base">
              Order Complete
            </span>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-10">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-10 text-center max-w-lg mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-heading font-semibold text-[#464646] mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add items to your cart before checking out.</p>
            <Link href="/shop" className="inline-block bg-[#075E5E] hover:bg-[#064d4d] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Address Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-bold text-[#464646] uppercase">
                    Delivery Address
                  </h2>
                  {authToken && (
                    <button
                      onClick={() => { setAddForm({ ...emptyForm }); setFormError(""); setFieldErrors({}); setShowAddModal(true); }}
                      className="text-sm font-semibold text-[#00473E] hover:text-brand transition-colors"
                    >
                      + Add New Address
                    </button>
                  )}
                </div>

                {addressLoading ? (
                  <div className="space-y-3">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-28 bg-gray-100 rounded-lg animate-pulse"></div>
                    ))}
                  </div>
                ) : addresses.length > 0 ? (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className={`block border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedAddressId === address.id
                            ? "border-[#00473E] bg-[#f0f9f8]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="address_select"
                            checked={selectedAddressId === address.id}
                            onChange={() => handleSelectAddress(address.id)}
                            className="mt-1 accent-[#00473E]"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-semibold text-[#464646]">{address.name}</span>
                                <span className="text-sm text-gray-500 ml-3">{address.contact_no}</span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => { e.preventDefault(); openEditModal(address); }}
                                  className="text-xs px-3 py-1 border border-[#00473E] text-[#00473E] rounded hover:bg-[#00473E] hover:text-white transition-colors"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => { e.preventDefault(); deleteAddress(address.id); }}
                                  className="text-xs px-3 py-1 border border-red-400 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {address.address_line1}
                              {address.address_line2 && `, ${address.address_line2}`}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state}, {address.country} - {address.postal_code}
                            </p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  /* No Address State */
                  <div className="text-center py-10">
                    <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-[#464646] mb-2">No Address Found</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Add your first shipping address to continue.
                    </p>
                    <button
                      onClick={() => { setAddForm({ ...emptyForm }); setFormError(""); setFieldErrors({}); setShowAddModal(true); }}
                      className="px-6 py-2.5 bg-[#075E5E] text-white font-semibold rounded-lg hover:bg-[#064d4d] transition-colors"
                    >
                      + Add New Address
                    </button>
                  </div>
                )}
              </div>

              {/* Order Items Preview */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold text-[#464646] uppercase mb-4">
                  Order Items ({cartItems.length})
                </h2>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={getProductImage(item)}
                          alt={item.product_name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-[#464646] truncate">{item.product_name}</h4>
                        {item.variant_value && (
                          <p className="text-xs text-gray-500">({item.variant_value})</p>
                        )}
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-[#464646] text-sm">
                        {formatPrice(parsePrice(item.selling_price) * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-heading font-bold text-[#464646] mb-6 uppercase">
                  Order Summary
                </h2>

                <div className="space-y-3 pb-4 border-b border-gray-100">
                  <div className="flex justify-between text-[#464646]">
                    <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#464646]">
                    <span>Tax (18%)</span>
                    <span className="font-semibold">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-[#464646]">
                    <span>Shipping</span>
                    <span className={`font-semibold ${shippingCost === 0 ? "text-green-600" : ""}`}>
                      {shippingLoading ? "..." : shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  {couponApplied && couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span className="font-semibold">-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                </div>

                {/* Coupon */}
                <div className="py-4 border-b border-gray-100">
                  {!couponApplied ? (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Coupon Code"
                          value={couponCode}
                          onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-[#00473E] transition-colors"
                        />
                        <button
                          onClick={applyCoupon}
                          disabled={couponLoading}
                          className="px-4 py-2.5 bg-[#075E5E] text-white text-sm font-semibold rounded-md hover:bg-[#064d4d] transition-colors disabled:opacity-50"
                        >
                          {couponLoading ? "..." : "Apply"}
                        </button>
                      </div>
                      {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-md">
                      <span className="text-sm text-green-700 font-semibold">{couponCode} applied</span>
                      <button onClick={removeCoupon} className="text-xs text-red-500 hover:underline">
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-between py-4 text-lg">
                  <span className="font-bold text-[#464646]">Total</span>
                  <span className="font-bold text-brand">{formatPrice(total)}</span>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={placingOrder || !selectedAddressId}
                  className="w-full bg-[#075E5E] hover:bg-[#064d4d] text-white font-semibold py-4 rounded-lg transition-colors uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {placingOrder ? "Placing Order..." : "Place Order"}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Inclusive of all taxes
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Add Address Modal ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => { setShowAddModal(false); setFormError(""); }}>
          <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => { setShowAddModal(false); setFormError(""); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-xl font-semibold text-[#00473E] mb-5">Add New Address</h3>
            {renderAddressForm(addForm, setAddForm, !authToken)}
            {formError && <p className="text-sm text-red-500 mt-3">{formError}</p>}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowAddModal(false); setFormError(""); }}
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAddress}
                disabled={formLoading}
                className="px-6 py-2.5 text-sm bg-[#00473E] text-white rounded-md font-semibold hover:bg-[#1a3634] transition-colors disabled:opacity-70"
              >
                {formLoading ? "Adding..." : "Add Address"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Address Modal ── */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-semibold text-[#00473E] mb-5">Update Address</h3>
            {renderAddressForm(editForm, (f) => setEditForm({ ...f, id: editForm.id }), false)}
            {formError && <p className="text-sm text-red-500 mt-3">{formError}</p>}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowEditModal(false); setFormError(""); }}
                className="px-4 py-2.5 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEditAddress}
                disabled={formLoading}
                className="px-6 py-2.5 text-sm bg-[#00473E] text-white rounded-md font-semibold hover:bg-[#1a3634] transition-colors disabled:opacity-70"
              >
                {formLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Login Modal ── */}
      {showLoginModal && !authToken && (
        <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowLoginModal(false)}>
          <div className="bg-white rounded-xl p-8 w-full max-w-[420px] shadow-2xl text-center relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-16 h-16 mx-auto mb-4 text-[#00473E]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-bold text-[#464646] mb-2">
              Login Required
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Please login or create an account to proceed with checkout.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full bg-[#075E5E] hover:bg-[#064d4d] text-white font-semibold py-3 rounded-lg transition-colors text-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="w-full border-2 border-[#075E5E] text-[#075E5E] hover:bg-[#f0f9f8] font-semibold py-3 rounded-lg transition-colors text-center"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── OTP Modal ── */}
      {otpStep !== "idle" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-8 w-full max-w-[400px] shadow-2xl">
            <h4 className="text-xl font-semibold text-[#00473E] mb-2">Enter OTP</h4>
            <p className="text-sm text-gray-600 mb-1">
              We have sent a 6-digit code to your mobile number.
            </p>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Sent to +91 {otpMobile.replace(/(\d{5})(\d{5})/, "$1 $2")}
            </p>
            <button
              type="button"
              className="text-[13px] text-[#00473E] font-semibold hover:underline mb-5 cursor-pointer"
              onClick={() => { setOtpStep("idle"); setOtpError(""); }}
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
                  onPaste={i === 0 ? handleOtpPaste : undefined}
                  disabled={otpStep === "verifying"}
                />
              ))}
            </div>

            {otpError && (
              <p className="text-[13px] text-red-500 text-center mb-3">{otpError}</p>
            )}

            <div className="flex items-center justify-between mt-4">
              <button
                type="button"
                className="text-sm text-[#00473E] font-semibold hover:underline cursor-pointer"
                onClick={handleResendOtp}
                disabled={otpStep === "verifying"}
              >
                Resend OTP
              </button>
              <button
                type="button"
                className="px-6 py-2 text-sm bg-[#00473E] text-white rounded-md font-semibold hover:bg-[#1a3634] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={handleVerifyOtp}
                disabled={otpStep === "verifying"}
              >
                {otpStep === "verifying" ? "Verifying..." : "Verify"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
