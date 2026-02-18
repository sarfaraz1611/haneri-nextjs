import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy - Haneri Electricals LLP",
  description:
    "Shipping Policy for HANERI ELECTRICALS LLP. Learn about our delivery timelines, shipping charges, and order tracking.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative bg-primary pt-20 md:pt-40 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="heading_1 text-center mb-8 uppercase text-[#315859]">
            Shipping Policy
          </h1>
          <p className="container mx-auto max-w-4xl text-neutral-600 leading-relaxed">
            Haneri Electricals LLP (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
            &ldquo;us&rdquo;) is committed to providing a seamless and efficient
            shipping experience for all our customers. This Shipping Policy
            outlines the terms and conditions for the delivery of our products.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        {/* Shipping Destinations */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            1. Shipping Destinations
          </h2>
          <ul className="text-neutral-600 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              We ship our products across all major cities and towns in India.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Delivery services may not be available in remote or
              non-serviceable areas. Customers in such locations will be notified
              during the order placement process.
            </li>
          </ul>
        </section>

        {/* Delivery Timelines */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            2. Delivery Timelines
          </h2>
          <ul className="text-neutral-600 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">Standard Delivery:</strong>{" "}
                Orders are typically delivered within 5-7 business days from the
                date of order confirmation.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">Express Delivery:</strong>{" "}
                Available in select cities, with delivery within 2-3 business
                days.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Delivery timelines may vary based on the location and product
              availability.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Customers will be notified of any delays due to unforeseen
              circumstances or high demand.
            </li>
          </ul>
        </section>

        {/* Shipping Charges */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            3. Shipping Charges
          </h2>
          <ul className="text-neutral-600 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">Free Shipping:</strong>{" "}
                Shipping charges are included in the product cost, and no
                additional fees are applied.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Any additional packaging request made by the customer will be
              charged extra as per actual.
            </li>
          </ul>
        </section>

        {/* Order Tracking */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            4. Order Tracking
          </h2>
          <ul className="text-neutral-600 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Once an order is shipped, customers will receive a confirmation
              email or SMS with a tracking ID and link.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Customers can use the tracking ID to monitor the shipment status
              via our logistics partner&apos;s portal.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                For any issues with tracking, please contact our customer
                support team at{" "}
                <a
                  href="mailto:INFO@HANERI.in"
                  className="text-brand hover:text-brand-dark font-semibold underline transition-colors"
                >
                  INFO@HANERI.in
                </a>
              </span>
            </li>
          </ul>
        </section>

        {/* Shipping Restrictions */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            5. Shipping Restrictions
          </h2>
          <ul className="text-neutral-600 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              We do not deliver to P.O. Boxes or military addresses (e.g.,
              APO/FPO).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Certain products may have shipping restrictions due to legal or
              regulatory requirements. Such restrictions will be communicated at
              the time of purchase.
            </li>
          </ul>
        </section>

        {/* Damaged or Lost Shipments */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            6. Damaged or Lost Shipments
          </h2>

          <h3 className="text-lg font-heading font-semibold mb-3 text-primary-dark">
            If a product arrives damaged:
          </h3>
          <ul className="text-neutral-600 mb-6 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Customers must notify our customer support team within 48 hours of
              delivery.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Please provide photographic evidence of the damaged product and
              packaging.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              We will arrange for a replacement or refund after verifying the
              issue.
            </li>
          </ul>

          <h3 className="text-lg font-heading font-semibold mb-3 text-primary-dark">
            For lost shipments:
          </h3>
          <ul className="text-neutral-600 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              If an order is not received within the expected delivery time,
              customers must contact our support team immediately.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              We will investigate with our logistics partner and provide a
              resolution within 7-10 business days.
            </li>
          </ul>
        </section>

        {/* Cancellation of Orders */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            7. Cancellation of Orders
          </h2>
          <ul className="text-neutral-600 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Orders can be cancelled before they are shipped. Once shipped,
              cancellations are not allowed.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                To cancel an order, contact Haneri Customer Support at{" "}
                <a
                  href="mailto:INFO@HANERI.in"
                  className="text-brand hover:text-brand-dark font-semibold underline transition-colors"
                >
                  INFO@HANERI.in
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Refunds for cancelled orders will be processed within 7-10
              business days.
            </li>
          </ul>
        </section>

        {/* Contact Us */}
        <section className="mb-10">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            8. Contact Us
          </h2>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            For any shipping-related queries or concerns, please contact:
          </p>
          <div className="text-neutral-600 space-y-2">
            <p className="font-semibold text-neutral-700">
              Haneri Customer Support
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:INFO@HANERI.in"
                className="text-brand hover:text-brand-dark font-semibold underline transition-colors"
              >
                INFO@HANERI.in
              </a>
            </p>
            <p>Office Address: A48, Sector 57, Noida, Uttar Pradesh - 201301</p>
          </div>
          <p className="text-neutral-600 mt-6 leading-relaxed">
            Haneri Electricals LLP reserves the right to update this Shipping
            Policy at its discretion. Any changes will be communicated via our
            website or official communication channels.
          </p>
          <p className="text-neutral-600 mt-4 leading-relaxed italic">
            Thank you for choosing Haneri. We are dedicated to ensuring your
            products reach you swiftly and safely.
          </p>
        </section>
      </div>
    </div>
  );
}
