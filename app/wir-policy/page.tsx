import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warranty, Installation & Refund Policy - Haneri Electricals LLP",
  description:
    "Warranty, Installation and Refund Policy for HANERI ELECTRICALS LLP. Learn about warranty coverage, refund terms, and installation services.",
};

export default function WarrantyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative bg-primary pt-20 md:pt-40 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="heading_1 text-center mb-8 uppercase text-[#315859]">
            Warranty, Installation &amp; Refund Policy
          </h1>
          <p className="container mx-auto max-w-4xl text-neutral-600 leading-relaxed">
            Haneri Electricals LLP (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
            &ldquo;us&rdquo;) is committed to ensuring customer satisfaction and
            confidence in our products. This Warranty and Refunds Policy provides
            clarity on the warranty coverage and refund/replacement terms for all
            Haneri products.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        {/* 1. Warranty Offering */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            1. Warranty Offering
          </h2>

          <h3 className="text-lg font-heading font-semibold mb-3 text-primary-dark">
            Accessories:
          </h3>
          <ul className="text-neutral-600 mb-4 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">
                  Remote Controls and Blade Sets:
                </strong>{" "}
                1 year warranty.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">
                  Mounting Kits, Downrods, and Canopies:
                </strong>{" "}
                10 days warranty (against transit damage only).
              </span>
            </li>
          </ul>
          <p className="text-neutral-600 leading-relaxed italic">
            Note: Warranty is applicable only for purchases made through
            authorized Haneri dealers, retailers, or official e-commerce
            platforms.
          </p>
        </section>

        {/* 2. Warranty Terms */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            2. Warranty Terms
          </h2>

          <ol className="text-neutral-600 space-y-6 pl-5 list-none">
            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <strong className="text-neutral-700">Coverage Period:</strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  The warranty period begins from the date of purchase as per the
                  original invoice.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  For serialized products, warranty is validated based on the
                  serial number and invoice.
                </li>
              </ul>
            </li>

            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <strong className="text-neutral-700">Scope of Warranty:</strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Covers manufacturing defects and functional failures under
                  normal usage.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Includes free repair or replacement of defective parts during
                  the warranty period.
                </li>
              </ul>
            </li>

            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <strong className="text-neutral-700">Exclusions:</strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Damage caused by improper installation, mishandling,
                  unauthorized repairs, or modifications.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Voltage fluctuations beyond 160V-250V.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Use of external regulators with remote-controlled fans.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Damage due to liquid exposure, pests, or external
                  environmental factors.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Normal wear and tear, including scratches, discoloration, or
                  dents.
                </li>
              </ul>
            </li>

            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <strong className="text-neutral-700">
                  Additional Warranty Conditions:
                </strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  For availing free home/onsite service, the product must be
                  within the warranty period.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  For serialized products with Sticker/Printed Manufacture
                  Month, warranty will be considered from the End User Sale
                  Invoice date till the time period mentioned in the warranty
                  table.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  For serialized products without Sticker/Printed Manufacture
                  Month, the start date will be considered from the End User Sale
                  Invoice date till the warranty period mentioned in the warranty
                  table.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  For any query or complaint about the product, the customer
                  needs to register a complaint only to the Company&apos;s
                  centralized call center number provided below.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  <span>
                    End User Sale Invoice should have the following clearly
                    mentioned:
                    <ul className="mt-2 space-y-1 pl-5">
                      <li className="flex items-start gap-2">
                        <span className="text-primary-green mt-1 shrink-0">
                          &#9642;
                        </span>
                        Valid GST Number
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-green mt-1 shrink-0">
                          &#9642;
                        </span>
                        Complete address and contact number of the shop or
                        platform from where the product was purchased
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-green mt-1 shrink-0">
                          &#9642;
                        </span>
                        Date of purchase, Model &amp; Serial number of the
                        Product
                      </li>
                    </ul>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  The warranty period starts from the date of the original
                  purchase of the SKU(s) by the first end-user. The invoice may
                  consist of different SKU(s) having different warranty periods.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  The Company will not entertain any complaint with incomplete
                  warranty details and service charge(s) as per company policy
                  may apply.
                </li>
              </ul>
            </li>
          </ol>
        </section>

        {/* 3. Claim Process */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            3. Claim Process
          </h2>

          <ol className="text-neutral-600 space-y-6 pl-5 list-none">
            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <strong className="text-neutral-700">Reporting a Claim:</strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  <span>
                    Contact Haneri Customer Support or email{" "}
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
                  Provide details including invoice, product serial number, and a
                  description of the issue.
                </li>
              </ul>
            </li>

            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <strong className="text-neutral-700">Inspection:</strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  A service technician will inspect the product on-site or at an
                  authorized service center.
                </li>
              </ul>
            </li>

            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <strong className="text-neutral-700">Resolution:</strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Products will be repaired, replaced, or refunded based on the
                  technician&apos;s assessment.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Replacement units will carry the remaining warranty period of
                  the original product.
                </li>
              </ul>
            </li>
          </ol>
        </section>

        {/* 4. Additional Terms */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            4. Additional Terms
          </h2>
          <ul className="text-neutral-600 space-y-3 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">Wobbling Issues:</strong>{" "}
                Claims must be reported within 30 days of purchase.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">Transit Damage:</strong>{" "}
                Claims for transit damage must be filed within 10 days of
                delivery.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">
                  Service Outside Warranty:
                </strong>{" "}
                Repairs for out-of-warranty products will be chargeable, subject
                to spare parts availability.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">Force Majeure:</strong>{" "}
                Haneri is not liable for delays or non-performance due to
                circumstances beyond its control, including natural disasters,
                pandemics, or government restrictions.
              </span>
            </li>
          </ul>
        </section>

        {/* 5. Customer Responsibilities */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            5. Customer Responsibilities
          </h2>
          <ul className="text-neutral-600 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Ensure correct installation and usage as per the user manual.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Provide necessary tools or access for service, such as ladders or
              clear workspaces.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Report any performance issues promptly to avoid further damage.
            </li>
          </ul>
        </section>

        {/* Refund and Replacement Policy */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            Refund and Replacement Policy
          </h2>

          <ol className="text-neutral-600 space-y-6 pl-5 list-none">
            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <strong className="text-neutral-700">Eligibility</strong>
              </div>
              <p className="text-neutral-600 pl-10 mb-2">
                Refunds or replacements are valid if:
              </p>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-primary-green mt-1 shrink-0">
                    &#9642;
                  </span>
                  The product has a manufacturing defect within 15 days of
                  purchase.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-green mt-1 shrink-0">
                    &#9642;
                  </span>
                  The product was received damaged or defective.
                </li>
              </ul>
            </li>

            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <strong className="text-neutral-700">Conditions</strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  The product must be returned in its original condition, with
                  all accessories and packaging intact.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Proof of purchase is mandatory for processing refunds or
                  replacements.
                </li>
              </ul>
            </li>

            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <strong className="text-neutral-700">Process</strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  <span>
                    Reach out to Haneri Customer Support at{" "}
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
                  Provide the purchase receipt and a description of the issue.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  After verification, the product may be inspected before
                  processing a refund or replacement.
                </li>
              </ul>
            </li>

            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <strong className="text-neutral-700">Refunds</strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Refunds will be processed through the original payment method
                  within 7-10 business days.
                </li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Installation and Service Guidelines */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            Installation and Service Guidelines
          </h2>

          <ol className="text-neutral-600 space-y-6 pl-5 list-none">
            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <strong className="text-neutral-700">Free Installation</strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Free installation services are available for select products
                  and cities. Contact Haneri Customer Support to confirm
                  availability.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  <span>
                    To avail of the free installation offer, customers need to
                    call or email Haneri Customer Support at{" "}
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
                  Working hours: 9 AM to 7 PM (Mon-Sat). We do not operate on
                  public and national holidays.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  A Haneri Service Executive will verify if the offer is
                  executable in your area.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  If your location is in a serviceable zone, the installation
                  request will be registered. For non-serviceable locations,
                  please refer to our installation video or guidelines.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Installation will be completed within 48 hours of request
                  registration.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Turnaround time/SLA starts from the date and time the request
                  is registered, after receiving all necessary details (Name,
                  Number, Purchase details, Address with pin code, Serial number
                  of the product, etc.).
                </li>
              </ul>
            </li>

            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <strong className="text-neutral-700">
                  Customer Responsibilities
                </strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Ensure that power supply requirements are met (e.g.,
                  160-250V).
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Provide necessary tools or access for installation, such as a
                  ladder or clear workspace.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Arrange for any additional modifications, such as false ceiling
                  adjustments, at the customer&apos;s expense.
                </li>
              </ul>
            </li>

            <li>
              <div className="flex items-start gap-3 mb-2">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <strong className="text-neutral-700">
                  Service Limitations
                </strong>
              </div>
              <ul className="text-neutral-600 space-y-2 pl-10">
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Haneri reserves the right to reject any service or installation
                  request if the area is beyond our serviceable zones or if no
                  authorized service center is available.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand mt-1 shrink-0">&#9679;</span>
                  Haneri is not responsible for delays caused by force majeure
                  events such as natural disasters, pandemics, or government
                  restrictions.
                </li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Contact Us */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            Contact Us
          </h2>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            For any warranty, installation, or refund-related queries, please
            contact:
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
        </section>

        {/* Amendments */}
        <section className="mb-10">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 uppercase tracking-wide">
            Amendments
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Haneri Electricals LLP reserves the right to modify this policy as
            necessary. Updates will be communicated via our website or official
            communication channels.
          </p>
          <p className="text-neutral-600 mt-4 leading-relaxed italic">
            Thank you for choosing Haneri. We&apos;re dedicated to providing
            superior products and services.
          </p>
        </section>
      </div>
    </div>
  );
}
