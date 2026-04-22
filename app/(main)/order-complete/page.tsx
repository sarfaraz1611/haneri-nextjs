"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { trackPurchase } from "@/lib/analytics";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.haneri.com/api";

const VARIANT_COLORS: Record<string, string> = {
  "Denim Blue": "#6497B2",
  "Baby Pink": "#C7ABA9",
  "Pearl White": "#F5F5F5",
  "Matte Black": "#21201E",
  "Pine": "#DDC194",
  "Beige": "#E6E0D4",
  "Walnut": "#926148",
  "Sunset Copper": "#936053",
  "Royal Brass": "#B7A97C",
  "Regal Gold": "#D3B063",
  "Pure Steel": "#878782",
  "Metallic Grey": "#D4D4D4",
  "Sand Beige": "#D3CBBB",
  "Metallic Walnut": "#7F513F",
  "Espresso Walnut": "#926148",
  "Moonlit White": "#E6E6E6",
  "Natural Pine": "#DDC194",
  "Velvet Black": "#0B0A08",
};

interface OrderItem {
  product_id?: number | string;
  id?: number | string;
  product_name: string;
  quantity: number;
  "variant value"?: string;
  variant_value?: string;
  selling_price?: number | string;
  price?: number | string;
}

interface OrderData {
  total_amount?: number;
  tax_amount?: number;
  shipping_charge?: number;
  coupon_code?: string;
  shipping_address?: string;
  items?: OrderItem[];
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 52 52" className="w-10 h-10" fill="none">
      <path d="M14 27l8 8 16-16" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 52 52" className="w-10 h-10" fill="none">
      <path d="M16 16l20 20M36 16l-20 20" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 52 52" className="w-10 h-10" fill="none">
      <path d="M26 16v14" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="26" cy="36" r="2.5" fill="white" />
    </svg>
  );
}

function OrderCompleteContent() {
  const searchParams = useSearchParams();

  const status    = searchParams.get("status")     || "success";
  const orderId   = searchParams.get("order_id")   || "N/A";
  const paymentId = searchParams.get("payment_id") || "N/A";
  const amount    = searchParams.get("amount")     || "0.00";

  const isSuccess   = status === "success";
  const isFailed    = status === "failed";
  const isCancelled = status === "cancelled";

  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken || orderId === "N/A") return;
    fetch(`${BASE_URL}/orders/${encodeURIComponent(orderId)}`, {
      headers: { Authorization: `Bearer ${authToken}`, Accept: "application/json" },
    })
      .then((r) => r.json())
      .then((res) => {
        if (res?.success && res?.data) {
          setOrderData(res.data);
          try {
            if (status === "success" && orderId !== "N/A") {
              const dedupeKey = `purchase_tracked_${orderId}`;
              if (!sessionStorage.getItem(dedupeKey)) {
                sessionStorage.setItem(dedupeKey, "1");
                const items = (res.data.items ?? []).map(
                  (it: OrderItem) => ({
                    item_id: String(it.product_id ?? it.id ?? ""),
                    item_name: it.product_name,
                    item_variant: it.variant_value ?? it["variant value"],
                    price:
                      parseFloat(
                        String(it.selling_price ?? it.price ?? 0),
                      ) || 0,
                    quantity: it.quantity,
                    currency: "INR",
                  }),
                );
                trackPurchase({
                  transaction_id: String(orderId),
                  currency: "INR",
                  value:
                    parseFloat(
                      String(res.data.total_amount ?? amount),
                    ) || 0,
                  tax: res.data.tax_amount,
                  shipping: res.data.shipping_charge ?? 0,
                  coupon: res.data.coupon_code,
                  items,
                });
              }
            }
          } catch {}
        }
      })
      .catch(() => {});
  }, [orderId, status, amount]);

  const displayAmount = orderData?.total_amount
    ? "₹\u00a0" + parseFloat(String(orderData.total_amount)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : `₹\u00a0${amount}`;

  const shippingAddress = orderData?.shipping_address || "N/A";

  const cfg = isSuccess ? {
    pageBg:     "from-[#e4f5f4] via-[#f4fffe] to-white",
    ringColor:  "ring-[#005d5a]/15",
    iconBg:     "from-[#005d5a] to-[#00807b]",
    glowColor:  "from-[#005d5a]",
    IconComp:   CheckIcon,
    badge:      "bg-[#e4f5f4] text-[#005d5a] border border-[#9ed5d2]",
    badgeText:  "Payment Successful",
    pillBg:     "from-[#005d5a] to-[#00807b]",
    accentBar:  "from-[#005d5a] to-[#00807b]",
    title:      "Thank You! Your Order Has Been Placed.",
    subtitle:   "We've received your order and payment. A confirmation email is on its way.",
    amountLabel:"Total Paid",
  } : isFailed ? {
    pageBg:     "from-red-50 via-red-50/30 to-white",
    ringColor:  "ring-red-200",
    iconBg:     "from-red-500 to-rose-600",
    glowColor:  "from-red-400",
    IconComp:   CrossIcon,
    badge:      "bg-red-50 text-red-600 border border-red-200",
    badgeText:  "Payment Failed",
    pillBg:     "from-red-500 to-rose-600",
    accentBar:  "from-red-500 to-rose-600",
    title:      "Payment Failed — Order Cancelled.",
    subtitle:   "Kindly place the order again.",
    amountLabel:"Order Value",
  } : {
    pageBg:     "from-amber-50 via-amber-50/20 to-white",
    ringColor:  "ring-amber-200",
    iconBg:     "from-amber-400 to-orange-500",
    glowColor:  "from-amber-400",
    IconComp:   AlertIcon,
    badge:      "bg-amber-50 text-amber-700 border border-amber-200",
    badgeText:  "Payment Pending",
    pillBg:     "from-amber-400 to-orange-500",
    accentBar:  "from-amber-400 to-orange-500",
    title:      "Order Cancelled.",
    subtitle:   "You closed the payment window. Kindly place the order again.",
    amountLabel:"Order Value",
  };

  return (
    <div className={`bg-gradient-to-b ${cfg.pageBg} min-h-screen pt-24 pb-24`}>

      {/* Confetti */}
      {isSuccess && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-sm"
              style={{
                width: i % 3 === 0 ? 9 : 6,
                height: i % 3 === 0 ? 15 : 10,
                left: `${3 + (i * 4.1) % 94}%`,
                top: "-24px",
                background: ["#005d5a","#ffb703","#3a86ff","#ff6b6b","#a855f7","#34d399"][i % 6],
                animation: `confettiFall ${1.5 + (i % 5) * 0.18}s ${i * 0.07}s forwards ease-out`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 max-w-4xl relative z-10">

        {/* Hero Card */}
        <div className={`relative bg-white rounded-3xl shadow-2xl ring-1 ${cfg.ringColor} p-8 sm:p-12 text-center mb-8 overflow-hidden`}>
          {/* Background glow */}
          <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-br ${cfg.glowColor} to-transparent opacity-[0.07] rounded-full blur-3xl pointer-events-none`} />

          {/* Icon */}
          <div
            className={`relative w-24 h-24 bg-gradient-to-br ${cfg.iconBg} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}
            style={{ animation: "popIn 0.7s cubic-bezier(.34,1.56,.64,1) forwards" }}
          >
            {isSuccess && (
              <span className="absolute inset-0 rounded-full bg-[#005d5a]/20 animate-ping" style={{ animationDuration: "1.8s" }} />
            )}
            <cfg.IconComp />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${cfg.badge}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {cfg.badgeText}
            </span>
          </div>

          {/* Amount pill */}
          <div className="flex justify-center mb-6">
            <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${cfg.pillBg} text-white rounded-2xl px-7 py-3 shadow-lg`}>
              <span className="text-xs font-semibold uppercase tracking-widest opacity-80">{cfg.amountLabel}</span>
              <span className="w-px h-4 bg-white/30" />
              <span className="text-2xl font-black tracking-tight">{displayAmount}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 leading-snug">{cfg.title}</h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">{cfg.subtitle}</p>

          {(isFailed || isCancelled) && (
            <p className="mt-3 text-xs text-gray-400 max-w-sm mx-auto">
              If any amount was deducted, it will be auto-refunded by your bank as per their policy.
            </p>
          )}

          {/* Order ID chip */}
          {orderId !== "N/A" && (
            <div className="mt-6 inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-5 py-2.5 text-sm">
              <span className="text-gray-400 font-medium">Order ID</span>
              <span className="w-px h-3.5 bg-gray-300" />
              <span className="font-mono font-bold text-gray-700 tracking-wide">{orderId}</span>
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-8">

          {/* Payment Summary */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${cfg.accentBar}`} />
              <h3 className="font-bold text-gray-800">Payment &amp; Order Summary</h3>
            </div>
            <div className="p-5 flex flex-col gap-2.5">
              {[
                { label: "Payment ID",       value: <span className="font-mono text-sm">{paymentId}</span> },
                { label: "Total Amount",     value: <span className="font-bold text-gray-900">{displayAmount}</span> },
                { label: "Shipping Address", value: <span className="leading-relaxed">{shippingAddress}</span> },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-start gap-4 rounded-xl px-4 py-3 bg-gray-50 hover:bg-gray-100/70 transition-colors">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-0.5 w-36 flex-shrink-0">{label}</span>
                  <span className="text-sm text-gray-700 flex-1 break-words">{value}</span>
                </div>
              ))}
              <div className="flex items-center gap-4 rounded-xl px-4 py-3 bg-gray-50">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider w-36 flex-shrink-0">Status</span>
                {isSuccess
                  ? <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Paid</span>
                  : isFailed
                    ? <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-bold px-3 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-red-400" />Failed</span>
                    : <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Pending</span>
                }
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${cfg.accentBar}`} />
              <h3 className="font-bold text-gray-800">Products Ordered</h3>
            </div>
            <div className="p-4 flex flex-col gap-2.5">
              {orderData?.items && orderData.items.length > 0 ? (
                orderData.items.map((item, i) => {
                  const variant  = item["variant value"] || item.variant_value || "";
                  const dotColor = VARIANT_COLORS[variant] || "#E5E7EB";
                  return (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100/70 transition-colors rounded-xl px-3 py-3">
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0 border-2 border-white shadow"
                        style={{ background: dotColor }}
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-sm font-semibold text-gray-800 truncate">{item.product_name}</span>
                        {variant && <span className="text-xs text-gray-400">{variant}</span>}
                      </div>
                      <span className="flex-shrink-0 bg-[#005d5a]/10 text-[#005d5a] text-xs font-black px-2.5 py-1 rounded-lg">
                        ×{item.quantity}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col gap-2.5">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/shop"
            className={`bg-gradient-to-r ${cfg.pillBg} text-white font-bold text-sm uppercase tracking-widest px-9 py-3.5 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl`}
          >
            Continue Shopping
          </Link>
          <Link
            href="/profile#order"
            className="bg-white border-2 border-gray-200 hover:border-gray-700 text-gray-600 hover:text-gray-900 font-bold text-sm uppercase tracking-widest px-7 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            View My Orders
          </Link>
        </div>

      </div>

      <style>{`
        @keyframes popIn {
          0%   { transform: scale(0.3) rotate(-12deg); opacity: 0; }
          55%  { transform: scale(1.15) rotate(4deg);  opacity: 1; }
          75%  { transform: scale(0.93) rotate(-2deg); }
          100% { transform: scale(1)   rotate(0deg);   opacity: 1; }
        }
        @keyframes confettiFall {
          0%   { opacity: 0; transform: translateY(-24px) rotate(0deg)   scale(0.7); }
          12%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(100vh) rotate(560deg) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export default function OrderCompletePage() {
  return (
    <Suspense>
      <OrderCompleteContent />
    </Suspense>
  );
}
