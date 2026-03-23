import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="bg-white rounded-2xl px-10 py-16 text-center max-w-xl mx-auto shadow-sm">
      {/* Icon with teal circle background */}
      <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-[#e8f4f4] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-14 h-14 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-heading font-semibold text-primary-dark mb-2 uppercase tracking-wide">
        Your cart is empty
      </h2>

      {/* Orange accent bar */}
      <div className="w-12 h-1 bg-brand rounded mx-auto mb-4" />

      {/* Subtitle */}
      <p className="text-gray-500 mb-8 text-base leading-relaxed">
        Looks like you haven&apos;t added any items to your cart yet.
      </p>

      {/* Primary CTA */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-10 py-3.5 rounded-lg transition-colors uppercase tracking-widest text-sm"
      >
        Continue Shopping
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>

      {/* Secondary link */}
      <p className="mt-5 text-sm text-gray-400">
        Not sure where to start?{" "}
        <Link href="/shop" className="text-brand hover:underline font-semibold">
          Browse all products
        </Link>
      </p>
    </div>
  );
}
