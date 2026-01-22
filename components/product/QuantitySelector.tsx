"use client";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  const decrease = () => onQuantityChange(Math.max(1, quantity - 1));
  const increase = () => onQuantityChange(quantity + 1);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={decrease}
        className="w-10 h-10 rounded-[10px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Decrease quantity"
      >
        <span className="text-lg font-bold">−</span>
      </button>
      <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
      <button
        onClick={increase}
        className="w-10 h-10 rounded-[10px] border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Increase quantity"
      >
        <span className="text-lg font-bold">+</span>
      </button>
    </div>
  );
}
