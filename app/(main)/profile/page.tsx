"use client";

import { useState, useEffect } from "react";
import {
  FaBox,
  FaMapMarkerAlt,
  FaUser,
  FaSignOutAlt,
  FaFileInvoice,
  FaDownload,
  FaEdit,
  FaTrash,
  FaShoppingBag,
  FaHome,
  FaCheckCircle,
} from "react-icons/fa";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.haneri.com/api";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
];

type Tab = "dashboard" | "orders" | "quotation" | "address" | "edit";

interface Address {
  id: number;
  name: string;
  contact_no: string;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  is_default: boolean;
}

interface Order {
  status: string;
  payment_status: string;
  shipping_address: string;
  total_amount: string | number;
  items: { order_id: number }[];
  invoice?: { url: string } | null;
}

interface Quotation {
  quotation_no: string;
  q_address: string;
  total_amount: string | number;
  invoice_quotation?: string | null;
  items: { quotation_id: number }[];
}

interface AddressForm {
  name: string;
  contact_no: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

const emptyAddressForm: AddressForm = {
  name: "",
  contact_no: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  country: "India",
  postal_code: "",
};

export default function ProfilePage() {
  const [hydrated, setHydrated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  // Orders
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Quotations
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [quotationsLoading, setQuotationsLoading] = useState(false);
  const [buyModalQuotationId, setBuyModalQuotationId] = useState<number | null>(null);
  const [buyLoading, setBuyLoading] = useState(false);
  const [deleteQuotationId, setDeleteQuotationId] = useState<number | null>(null);

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addForm, setAddForm] = useState<AddressForm>({ ...emptyAddressForm });
  const [editForm, setEditForm] = useState<AddressForm & { id?: number }>({ ...emptyAddressForm });
  const [addressFormLoading, setAddressFormLoading] = useState(false);
  const [addressFormError, setAddressFormError] = useState("");
  const [deleteAddressId, setDeleteAddressId] = useState<number | null>(null);
  const [deleteAddressLoading, setDeleteAddressLoading] = useState(false);

  // Profile / Account Details
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Flash
  const [flash, setFlash] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (flash) {
      const t = setTimeout(() => setFlash(null), 3000);
      return () => clearTimeout(t);
    }
  }, [flash]);

  // Hydrate from localStorage
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    setAuthToken(token);
    setUserName(localStorage.getItem("user_name") || "");
    setUserRole(localStorage.getItem("user_role") || "");
    setHydrated(true);
  }, []);

  // Fetch data when tab activates
  useEffect(() => {
    if (!hydrated || !authToken) return;
    if (activeTab === "orders" && orders.length === 0) fetchOrders();
    if (activeTab === "quotation" && quotations.length === 0) fetchQuotations();
    if (activeTab === "address" && addresses.length === 0) fetchAddresses();
    if (activeTab === "edit" && !profile.email) fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, hydrated]);

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  });

  // ── Orders ──────────────────────────────────────────────────────────────────
  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/orders`, { headers: authHeaders() });
      const data = await res.json();
      if (Array.isArray(data?.data)) setOrders(data.data);
    } catch {
      setFlash({ type: "error", message: "Failed to load orders." });
    } finally {
      setOrdersLoading(false);
    }
  };

  // ── Quotations ───────────────────────────────────────────────────────────────
  const fetchQuotations = async () => {
    setQuotationsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/quotation/fetch`, { headers: authHeaders() });
      const data = await res.json();
      if (Array.isArray(data?.data)) setQuotations(data.data);
    } catch {
      setFlash({ type: "error", message: "Failed to load quotations." });
    } finally {
      setQuotationsLoading(false);
    }
  };

  const handleBuyNow = async (mode: "merge" | "replace") => {
    if (!buyModalQuotationId) return;
    setBuyLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cart/cart-from-quotation`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ quotation_id: buyModalQuotationId, mode }),
      });
      const data = await res.json();
      if (data?.success || data?.message?.toLowerCase().includes("success")) {
        setFlash({ type: "success", message: "Items added to cart!" });
        setBuyModalQuotationId(null);
      } else {
        setFlash({ type: "error", message: data?.message || "Failed to add to cart." });
      }
    } catch {
      setFlash({ type: "error", message: "Something went wrong." });
    } finally {
      setBuyLoading(false);
    }
  };

  const handleDeleteQuotation = async (id: number) => {
    try {
      const res = await fetch(`${BASE_URL}/quotation/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data?.success || data?.message?.toLowerCase().includes("delet")) {
        setQuotations((q) => q.filter((x) => x.items[0]?.quotation_id !== id));
        setFlash({ type: "success", message: "Quotation deleted." });
      } else {
        setFlash({ type: "error", message: data?.message || "Failed to delete." });
      }
    } catch {
      setFlash({ type: "error", message: "Something went wrong." });
    } finally {
      setDeleteQuotationId(null);
    }
  };

  // ── Addresses ────────────────────────────────────────────────────────────────
  const fetchAddresses = async () => {
    setAddressLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/address`, { headers: authHeaders() });
      const data = await res.json();
      if (Array.isArray(data?.data)) setAddresses(data.data);
    } catch {
      setFlash({ type: "error", message: "Failed to load addresses." });
    } finally {
      setAddressLoading(false);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name || !addForm.contact_no || !addForm.address_line1 || !addForm.city || !addForm.state || !addForm.postal_code) {
      setAddressFormError("Please fill all required fields.");
      return;
    }
    setAddressFormLoading(true);
    setAddressFormError("");
    try {
      const res = await fetch(`${BASE_URL}/address/register`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ ...addForm, address_line2: addForm.address_line2 || null, is_default: true }),
      });
      const data = await res.json();
      if (data?.message?.toLowerCase().includes("success")) {
        setFlash({ type: "success", message: "Address added." });
        setShowAddModal(false);
        setAddForm({ ...emptyAddressForm });
        setAddresses([]);
        fetchAddresses();
      } else {
        setAddressFormError(data?.message || "Failed to add address.");
      }
    } catch {
      setAddressFormError("Something went wrong.");
    } finally {
      setAddressFormLoading(false);
    }
  };

  const openEditModal = (addr: Address) => {
    setEditForm({
      id: addr.id,
      name: addr.name,
      contact_no: addr.contact_no,
      address_line1: addr.address_line1,
      address_line2: addr.address_line2 || "",
      city: addr.city,
      state: addr.state,
      country: addr.country,
      postal_code: addr.postal_code,
    });
    setAddressFormError("");
    setShowEditModal(true);
  };

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.name || !editForm.contact_no || !editForm.address_line1 || !editForm.city || !editForm.state || !editForm.postal_code) {
      setAddressFormError("Please fill all required fields.");
      return;
    }
    setAddressFormLoading(true);
    setAddressFormError("");
    try {
      const res = await fetch(`${BASE_URL}/address/update/${editForm.id}`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ ...editForm, address_line2: editForm.address_line2 || null, is_default: true }),
      });
      const data = await res.json();
      if (data?.message?.toLowerCase().includes("updated")) {
        setFlash({ type: "success", message: "Address updated." });
        setShowEditModal(false);
        setAddresses([]);
        fetchAddresses();
      } else {
        setAddressFormError(data?.message || "Failed to update address.");
      }
    } catch {
      setAddressFormError("Something went wrong.");
    } finally {
      setAddressFormLoading(false);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    setDeleteAddressLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/address/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      const data = await res.json();
      if (data?.message?.toLowerCase().includes("deleted")) {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
        setFlash({ type: "success", message: "Address deleted." });
      } else {
        setFlash({ type: "error", message: data?.message || "Failed to delete." });
      }
    } catch {
      setFlash({ type: "error", message: "Something went wrong." });
    } finally {
      setDeleteAddressId(null);
      setDeleteAddressLoading(false);
    }
  };

  // ── Profile ──────────────────────────────────────────────────────────────────
  const fetchProfile = async () => {
    setProfileLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/profile`, { headers: authHeaders() });
      const data = await res.json();
      if (data?.data) {
        const u = data.data;
        setProfile({
          firstName: u.first_name || u.firstname || u.name?.split(" ")[0] || "",
          lastName: u.last_name || u.lastname || u.name?.split(" ").slice(1).join(" ") || "",
          email: u.email || "",
          mobile: u.mobile || u.contact_no || "",
        });
      }
    } catch {
      setFlash({ type: "error", message: "Failed to load profile." });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.firstName || !profile.email) {
      setFlash({ type: "error", message: "First name and email are required." });
      return;
    }
    setSavingProfile(true);
    try {
      const name = [profile.firstName, profile.lastName].filter(Boolean).join(" ");
      const res = await fetch(`${BASE_URL}/users/update`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ name, email: profile.email }),
      });
      const data = await res.json();
      if (data?.message?.toLowerCase().includes("success")) {
        setFlash({ type: "success", message: "Profile updated successfully." });
      } else {
        setFlash({ type: "error", message: data?.message || "Failed to update profile." });
      }
    } catch {
      setFlash({ type: "error", message: "Something went wrong." });
    } finally {
      setSavingProfile(false);
    }
  };

  // ── Logout ───────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    [
      "auth_token", "user_name", "user_email", "user_mobile",
      "user_role", "user_id", "unique_id", "guest_id", "pwd_000", "temp_id",
    ].forEach((k) => localStorage.removeItem(k));
    window.location.href = "/login";
  };

  if (!hydrated) return null;

  // ── NAV ITEMS ────────────────────────────────────────────────────────────────
  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "orders", label: "Orders", icon: <FaBox /> },
    ...(userRole !== "customer" ? [{ id: "quotation" as Tab, label: "Quotation", icon: <FaFileInvoice /> }] : []),
    { id: "address", label: "Addresses", icon: <FaMapMarkerAlt /> },
    { id: "edit", label: "Account Details", icon: <FaUser /> },
  ];

  // ── RENDER ───────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gray-50 py-10 pt-10 lg:pt-20 px-4">
      {/* Flash Toast */}
      {flash && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all duration-300 ${
            flash.type === "success" ? "bg-[#005d5a] text-white" : "bg-red-600 text-white"
          }`}
        >
          {flash.message}
        </div>
      )}

       <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Sidebar ─────────────────────────────────────────────────────── */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#005d5a] px-6 py-5">
                <h2 className="text-white font-bold text-lg">My Account</h2>
                <p className="text-[#a0d4d2] text-sm mt-0.5">Manage orders, addresses &amp; profile</p>
              </div>
              <nav className="p-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                      activeTab === item.id
                        ? "bg-[#005d5a]/10 text-[#005d5a]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`text-base ${activeTab === item.id ? "text-[#005d5a]" : "text-gray-400"}`}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors text-left mt-1"
                >
                  <FaSignOutAlt className="text-base text-red-400" />
                  Log out
                </button>
              </nav>
            </div>
          </aside>

          {/* ── Main Content ─────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Hello, <span className="text-[#005d5a]">{userName || "there"}</span>!
                </h3>
                <p className="text-gray-500 text-sm mb-8">
                  From your account dashboard you can view your recent orders, manage your addresses, and edit your account details.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { tab: "orders" as Tab, icon: <FaBox className="text-3xl text-[#005d5a]" />, label: "Orders" },
                    { tab: "address" as Tab, icon: <FaMapMarkerAlt className="text-3xl text-[#005d5a]" />, label: "Addresses" },
                    { tab: "edit" as Tab, icon: <FaUser className="text-3xl text-[#005d5a]" />, label: "Account Details" },
                  ].map((tile) => (
                    <button
                      key={tile.tab}
                      onClick={() => setActiveTab(tile.tab)}
                      className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-gray-100 hover:border-[#005d5a]/30 hover:bg-[#005d5a]/5 transition-all cursor-pointer"
                    >
                      {tile.icon}
                      <span className="text-sm font-semibold text-gray-700">{tile.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Orders */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaBox className="text-[#005d5a]" /> Orders
                </h3>
                {ordersLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <p className="text-center text-gray-400 py-10">No orders yet.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {["ORDER", "BILLING", "STATUS", "PAYMENT", "TOTAL", "ACTIONS"].map((h) => (
                            <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {orders.map((order, i) => {
                          const orderId = order.items?.[0]?.order_id ?? "—";
                          const invoiceUrl = order.invoice?.url ?? null;
                          return (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="py-3 px-3 font-medium text-gray-700">#{orderId}</td>
                              <td className="py-3 px-3 text-gray-500 max-w-[160px] truncate">{order.shipping_address || "—"}</td>
                              <td className="py-3 px-3">
                                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                                  {order.status || "Pending"}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                                  order.payment_status?.toLowerCase() === "paid"
                                    ? "bg-green-50 text-green-700"
                                    : "bg-yellow-50 text-yellow-700"
                                }`}>
                                  {order.payment_status || "Pending"}
                                </span>
                              </td>
                              <td className="py-3 px-3 font-semibold text-gray-800 whitespace-nowrap">
                                ₹{order.total_amount || "0.00"}
                              </td>
                              <td className="py-3 px-3">
                                {invoiceUrl ? (
                                  <a
                                    href={invoiceUrl}
                                    download
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#005d5a] text-white text-xs font-medium hover:bg-[#004744] transition-colors"
                                  >
                                    <FaDownload className="text-xs" /> Invoice
                                  </a>
                                ) : (
                                  <span className="text-gray-300 text-xs">—</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Quotations */}
            {activeTab === "quotation" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaFileInvoice className="text-[#005d5a]" /> Quotations
                </h3>
                {quotationsLoading ? (
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-12 bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : quotations.length === 0 ? (
                  <p className="text-center text-gray-400 py-10">No quotations found.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {["##", "QUOTE NO", "USER", "TOTAL", "QUOTATION", "BUY", "ACTION"].map((h) => (
                            <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {quotations.map((q, i) => {
                          const qId = q.items?.[0]?.quotation_id ?? i;
                          return (
                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                              <td className="py-3 px-3 text-gray-500">#{qId}</td>
                              <td className="py-3 px-3 font-medium text-gray-700">{q.quotation_no || "—"}</td>
                              <td className="py-3 px-3 text-gray-500 max-w-[140px] truncate">{q.q_address || "—"}</td>
                              <td className="py-3 px-3 font-semibold text-gray-800 whitespace-nowrap">₹{q.total_amount || "0.00"}</td>
                              <td className="py-3 px-3">
                                {q.invoice_quotation ? (
                                  <a
                                    href={q.invoice_quotation}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#005d5a] underline text-xs font-medium"
                                  >
                                    View
                                  </a>
                                ) : (
                                  <span className="text-gray-300 text-xs">—</span>
                                )}
                              </td>
                              <td className="py-3 px-3">
                                <button
                                  onClick={() => setBuyModalQuotationId(Number(qId))}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium hover:bg-green-700 transition-colors"
                                >
                                  <FaShoppingBag className="text-xs" /> Buy
                                </button>
                              </td>
                              <td className="py-3 px-3">
                                <button
                                  onClick={() => setDeleteQuotationId(Number(qId))}
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                >
                                  <FaTrash className="text-xs" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Addresses */}
            {activeTab === "address" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#005d5a]" /> Addresses
                  </h3>
                  <button
                    onClick={() => { setAddressFormError(""); setAddForm({ ...emptyAddressForm }); setShowAddModal(true); }}
                    className="px-4 py-2 rounded-xl bg-[#005d5a] text-white text-sm font-semibold hover:bg-[#004744] transition-colors"
                  >
                    + Add Address
                  </button>
                </div>

                {addressLoading ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-xl" />
                    ))}
                  </div>
                ) : addresses.length === 0 ? (
                  <p className="text-gray-400 text-sm py-6">You have not set up any addresses yet.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`relative rounded-xl border p-4 transition-all ${
                          addr.is_default ? "border-[#005d5a] bg-[#005d5a]/5" : "border-gray-200 bg-white"
                        }`}
                      >
                        {addr.is_default && (
                          <span className="absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold text-[#005d5a]">
                            <FaCheckCircle /> Default
                          </span>
                        )}
                        <p className="font-semibold text-gray-800">{addr.name}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{addr.contact_no}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          {addr.address_line1}
                          {addr.address_line2 ? `, ${addr.address_line2}` : ""}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.city}, {addr.state}, {addr.country} – {addr.postal_code}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => openEditModal(addr)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => setDeleteAddressId(addr.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-100 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Account Details */}
            {activeTab === "edit" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FaUser className="text-[#005d5a]" /> Account Details
                </h3>
                {profileLoading ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-11 bg-gray-100 animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleSaveProfile} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          First name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
                          placeholder="First name"
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005d5a]/30 focus:border-[#005d5a]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
                          placeholder="Last name"
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005d5a]/30 focus:border-[#005d5a]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Mobile number <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={profile.mobile}
                        readOnly
                        className="w-full border border-gray-100 rounded-xl px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-400 mt-1">Mobile number cannot be changed.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005d5a]/30 focus:border-[#005d5a]"
                        required
                      />
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">Password change</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Current password <span className="text-gray-400 font-normal">(optional)</span>
                          </label>
                          <input
                            type="password"
                            placeholder="Leave blank to keep current password"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005d5a]/30 focus:border-[#005d5a]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            New password <span className="text-gray-400 font-normal">(optional)</span>
                          </label>
                          <input
                            type="password"
                            placeholder="Leave blank to keep current password"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005d5a]/30 focus:border-[#005d5a]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm new password</label>
                          <input
                            type="password"
                            placeholder="Repeat new password"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005d5a]/30 focus:border-[#005d5a]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={savingProfile}
                        className="px-6 py-2.5 rounded-xl bg-[#005d5a] text-white text-sm font-semibold hover:bg-[#004744] transition-colors disabled:opacity-60"
                      >
                        {savingProfile ? "Saving..." : "Save changes"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Add Address Modal ──────────────────────────────────────────────────── */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Add New Address</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleAddAddress} className="p-6">
              <AddressFormFields form={addForm} onChange={setAddForm} error={addressFormError} />
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" disabled={addressFormLoading} className="px-5 py-2.5 rounded-xl bg-[#005d5a] text-white text-sm font-semibold hover:bg-[#004744] disabled:opacity-60">
                  {addressFormLoading ? "Saving..." : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Edit Address Modal ─────────────────────────────────────────────────── */}
      {showEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Update Address</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleUpdateAddress} className="p-6">
              <AddressFormFields form={editForm} onChange={(v) => setEditForm((prev) => ({ ...prev, ...v }))} error={addressFormError} />
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" disabled={addressFormLoading} className="px-5 py-2.5 rounded-xl bg-[#005d5a] text-white text-sm font-semibold hover:bg-[#004744] disabled:opacity-60">
                  {addressFormLoading ? "Updating..." : "Update Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Address Confirm ─────────────────────────────────────────────── */}
      {deleteAddressId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <FaTrash className="text-red-500 text-lg" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Delete Address?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteAddressId(null)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAddress(deleteAddressId)}
                disabled={deleteAddressLoading}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
              >
                {deleteAddressLoading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Quotation Confirm ───────────────────────────────────────────── */}
      {deleteQuotationId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <FaTrash className="text-red-500 text-lg" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Delete Quotation?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteQuotationId(null)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={() => handleDeleteQuotation(deleteQuotationId)}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Buy Now Modal ──────────────────────────────────────────────────────── */}
      {buyModalQuotationId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <FaShoppingBag className="text-green-600 text-lg" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Add to Cart</h3>
            <p className="text-sm text-gray-500 mb-6">How would you like to add these products?</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleBuyNow("merge")}
                disabled={buyLoading}
                className="w-full py-2.5 rounded-xl bg-[#005d5a] text-white text-sm font-semibold hover:bg-[#004744] disabled:opacity-60"
              >
                {buyLoading ? "Adding..." : "Merge with Cart"}
              </button>
              <button
                onClick={() => handleBuyNow("replace")}
                disabled={buyLoading}
                className="w-full py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
              >
                {buyLoading ? "Adding..." : "Replace Cart"}
              </button>
              <button
                onClick={() => setBuyModalQuotationId(null)}
                className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ── Address Form Fields (shared between Add & Edit) ─────────────────────────
function AddressFormFields({
  form,
  onChange,
  error,
}: {
  form: AddressForm;
  onChange: (v: Partial<AddressForm>) => void;
  error: string;
}) {
  const input = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#005d5a]/30 focus:border-[#005d5a]";

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Name <span className="text-red-400">*</span></label>
        <input type="text" value={form.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="Full name" className={input} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact No <span className="text-red-400">*</span></label>
        <input type="text" value={form.contact_no} onChange={(e) => onChange({ contact_no: e.target.value })} placeholder="10-digit mobile" className={input} required />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 1 <span className="text-red-400">*</span></label>
        <input type="text" value={form.address_line1} onChange={(e) => onChange({ address_line1: e.target.value })} placeholder="Street, building" className={input} required />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 2 <span className="text-gray-400 font-normal">(optional)</span></label>
        <input type="text" value={form.address_line2} onChange={(e) => onChange({ address_line2: e.target.value })} placeholder="Apartment, suite, etc." className={input} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">City <span className="text-red-400">*</span></label>
        <input type="text" value={form.city} onChange={(e) => onChange({ city: e.target.value })} placeholder="City" className={input} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">State <span className="text-red-400">*</span></label>
        <select value={form.state} onChange={(e) => onChange({ state: e.target.value })} className={input} required>
          <option value="">Select State</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
        <select value={form.country} onChange={(e) => onChange({ country: e.target.value })} className={input}>
          <option value="India">India</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Pincode <span className="text-red-400">*</span></label>
        <input type="text" value={form.postal_code} onChange={(e) => onChange({ postal_code: e.target.value })} placeholder="6-digit pincode" className={input} required />
      </div>
      {error && (
        <div className="sm:col-span-2">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
