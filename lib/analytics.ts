// Fire-and-forget GA4-via-GTM dataLayer helpers. No-op when window.dataLayer
// is unavailable (SSR, adblock, GTM blocked).

export interface GA4Item {
  item_id: string;
  item_name: string;
  affiliation?: string;
  coupon?: string;
  currency?: string;
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_list_id?: string;
  item_list_name?: string;
  item_variant?: string;
  location_id?: string;
  price?: number;
  quantity?: number;
}

export interface EcommercePayload {
  currency?: string;
  value?: number;
  items: GA4Item[];
  transaction_id?: string;
  tax?: number;
  shipping?: number;
  coupon?: string;
  payment_type?: string;
  shipping_tier?: string;
  item_list_id?: string;
  item_list_name?: string;
}

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

const DEBUG = process.env.NODE_ENV !== "production";

export function pushToDataLayer(
  event: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  if (!w.dataLayer) return;
  try {
    if ("items" in params) w.dataLayer.push({ ecommerce: null });
    w.dataLayer.push({
      event,
      ...params,
      ...(DEBUG ? { debug_mode: true } : {}),
    });
  } catch {
    /* never break UX */
  }
}

// Page view
export function trackPageView(url: string, title?: string): void {
  pushToDataLayer("page_view", {
    page_location:
      typeof window !== "undefined"
        ? window.location.origin + url
        : url,
    page_path: url,
    page_title:
      title ?? (typeof document !== "undefined" ? document.title : undefined),
  });
}

// User identity
export interface UserProps {
  user_id?: string | number | null;
  user_role?: string | null;
  logged_in?: boolean;
}

export function setUserProperties(props: UserProps): void {
  pushToDataLayer("user_properties", {
    user_id: props.user_id ? String(props.user_id) : undefined,
    user_role: props.user_role ?? undefined,
    logged_in: props.logged_in ?? false,
  });
}

export function clearUserProperties(): void {
  pushToDataLayer("user_properties", {
    user_id: undefined,
    user_role: undefined,
    logged_in: false,
  });
}

export function syncUserPropertiesFromLocalStorage(): void {
  if (typeof window === "undefined") return;
  try {
    const uid = window.localStorage.getItem("user_id");
    const role = window.localStorage.getItem("user_role");
    setUserProperties({
      user_id: uid,
      user_role: role,
      logged_in: Boolean(uid),
    });
  } catch {
    /* localStorage may be blocked */
  }
}

// Auth events
export type LoginMethod = "email" | "otp" | "google";
export type SignUpRole = "customer" | "architect" | "dealer";

export function trackLogin(
  method: LoginMethod,
  userId?: string | number
): void {
  pushToDataLayer("login", {
    method,
    user_id: userId ? String(userId) : undefined,
  });
}

export function trackSignUp(
  method: LoginMethod,
  role: SignUpRole,
  userId?: string | number
): void {
  pushToDataLayer("sign_up", {
    method,
    user_role: role,
    user_id: userId ? String(userId) : undefined,
  });
}

export function trackOtpRequest(channel: "sms" | "email" = "sms"): void {
  pushToDataLayer("otp_request", { channel });
}

export function trackOtpVerify(success: boolean): void {
  pushToDataLayer("otp_verify", { success });
}

export function trackLogout(): void {
  pushToDataLayer("logout", {});
  clearUserProperties();
}

// E-commerce events
export function trackViewItemList(
  listId: string,
  listName: string,
  items: GA4Item[]
): void {
  pushToDataLayer("view_item_list", {
    item_list_id: listId,
    item_list_name: listName,
    items,
  });
}

export function trackSelectItem(
  listId: string,
  listName: string,
  item: GA4Item
): void {
  pushToDataLayer("select_item", {
    item_list_id: listId,
    item_list_name: listName,
    items: [item],
  });
}

export function trackViewItem(p: EcommercePayload): void {
  pushToDataLayer("view_item", {
    currency: p.currency ?? "INR",
    value: p.value,
    items: p.items,
  });
}

export function trackAddToCart(p: EcommercePayload): void {
  pushToDataLayer("add_to_cart", {
    currency: p.currency ?? "INR",
    value: p.value,
    items: p.items,
  });
}

export function trackRemoveFromCart(p: EcommercePayload): void {
  pushToDataLayer("remove_from_cart", {
    currency: p.currency ?? "INR",
    value: p.value,
    items: p.items,
  });
}

export function trackViewCart(p: EcommercePayload): void {
  pushToDataLayer("view_cart", {
    currency: p.currency ?? "INR",
    value: p.value,
    items: p.items,
  });
}

export function trackBeginCheckout(p: EcommercePayload): void {
  pushToDataLayer("begin_checkout", {
    currency: p.currency ?? "INR",
    value: p.value,
    coupon: p.coupon,
    items: p.items,
  });
}

export function trackAddShippingInfo(p: EcommercePayload): void {
  pushToDataLayer("add_shipping_info", {
    currency: p.currency ?? "INR",
    value: p.value,
    coupon: p.coupon,
    shipping_tier: p.shipping_tier ?? "Standard",
    items: p.items,
  });
}

export function trackAddPaymentInfo(p: EcommercePayload): void {
  pushToDataLayer("add_payment_info", {
    currency: p.currency ?? "INR",
    value: p.value,
    coupon: p.coupon,
    payment_type: p.payment_type ?? "Razorpay",
    items: p.items,
  });
}

export function trackPurchase(p: EcommercePayload): void {
  if (!p.transaction_id) return;
  pushToDataLayer("purchase", {
    transaction_id: p.transaction_id,
    currency: p.currency ?? "INR",
    value: p.value,
    tax: p.tax,
    shipping: p.shipping,
    coupon: p.coupon,
    items: p.items,
  });
}

export function trackRefund(p: EcommercePayload): void {
  pushToDataLayer("refund", {
    transaction_id: p.transaction_id,
    currency: p.currency ?? "INR",
    value: p.value,
    items: p.items,
  });
}

// Engagement
export function trackSearch(searchTerm: string): void {
  pushToDataLayer("search", { search_term: searchTerm });
}

export function trackViewSearchResults(
  searchTerm: string,
  resultCount: number
): void {
  pushToDataLayer("view_search_results", {
    search_term: searchTerm,
    result_count: resultCount,
  });
}

export function trackFilterApplied(
  filterType: "category" | "price" | "color" | "sort",
  value: string
): void {
  pushToDataLayer("filter_applied", {
    filter_type: filterType,
    filter_value: value,
  });
}

export function trackGenerateLead(
  source: "contact_form" | "quotation_request" | "callback",
  value?: number
): void {
  pushToDataLayer("generate_lead", {
    currency: "INR",
    value: value ?? 0,
    lead_source: source,
  });
}

export function trackShare(
  method: string,
  contentType: string,
  itemId?: string
): void {
  pushToDataLayer("share", {
    method,
    content_type: contentType,
    item_id: itemId,
  });
}

export function trackVideoStart(videoId: string, videoTitle: string): void {
  pushToDataLayer("video_start", {
    video_id: videoId,
    video_title: videoTitle,
  });
}

export function trackVideoProgress(
  videoId: string,
  percent: 10 | 25 | 50 | 75 | 90
): void {
  pushToDataLayer("video_progress", {
    video_id: videoId,
    video_percent: percent,
  });
}

export function trackVideoComplete(videoId: string, videoTitle: string): void {
  pushToDataLayer("video_complete", {
    video_id: videoId,
    video_title: videoTitle,
  });
}

export function trackFileDownload(
  fileName: string,
  fileUrl: string,
  fileExt?: string
): void {
  pushToDataLayer("file_download", {
    file_name: fileName,
    file_url: fileUrl,
    file_extension: fileExt,
  });
}

export function trackOutboundClick(url: string, linkText?: string): void {
  pushToDataLayer("click", {
    link_url: url,
    link_text: linkText,
    outbound: true,
  });
}
