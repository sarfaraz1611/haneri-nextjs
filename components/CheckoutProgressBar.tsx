import Link from "next/link";

interface CheckoutProgressBarProps {
  step: 1 | 2 | 3;
}

const steps = [
  { label: "Shopping Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
  { label: "Order Complete", href: "/order-complete" },
];

export default function CheckoutProgressBar({ step }: CheckoutProgressBarProps) {
  return (
    <div className="bg-primary py-5 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-0">
          {steps.map((s, i) => {
            const num = (i + 1) as 1 | 2 | 3;
            const isActive = num === step;
            const isCompleted = num < step;
            const isUpcoming = num > step;

            const circle = (
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-brand text-white shadow-lg ring-2 ring-brand/40"
                    : isCompleted
                    ? "bg-brand/70 text-white"
                    : "border-2 border-white/30 text-white/50"
                }`}
              >
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  num
                )}
              </div>
            );

            const label = (
              <span
                className={`font-heading text-md font-semibold hidden sm:inline transition-colors ${
                  isActive
                    ? "text-white"
                    : isCompleted
                    ? "text-white/80"
                    : "text-white/50"
                }`}
              >
                {s.label}
              </span>
            );

            const connector = i < steps.length - 1 && (
              <div className="flex items-center mx-3 sm:mx-4">
                <div className={`h-px w-8 sm:w-14 ${isActive || isCompleted ? "bg-white/30" : "bg-white/10"}`} />
                <div className={`w-1.5 h-1.5 rounded-full mx-1 ${isActive || isCompleted ? "bg-white/30" : "bg-white/10"}`} />
                <div className={`h-px w-8 sm:w-14 ${isActive || isCompleted ? "bg-white/30" : "bg-white/10"}`} />
              </div>
            );

            const stepEl = isCompleted ? (
              <Link href={s.href} className="flex items-center gap-2 group">
                {circle}
                {label}
              </Link>
            ) : isUpcoming ? (
              <div className="flex items-center gap-2 opacity-40">
                {circle}
                {label}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {circle}
                {label}
              </div>
            );

            return (
              <div key={num} className="flex items-center">
                {stepEl}
                {connector}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
