"use client";

const FAQ_ITEMS = [
  ["What makes Haneri different?", "Design + engineering for fluid airflow."],
  [
    "Is installation included?",
    "We provide service & installation in supported cities.",
  ],
  ["Warranty?", "5 years from the date of purchase."],
] as const;

export default function ProductFAQ() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="font-barlow text-3xl text-[#2a5b57] mb-4">
        Frequently Asked Questions
      </h2>

      {FAQ_ITEMS.map(([question, answer]) => (
        <details key={question} className="border-t py-4">
          <summary className="cursor-pointer font-semibold">{question}</summary>
          <p className="mt-2 text-sm text-gray-600">{answer}</p>
        </details>
      ))}
    </section>
  );
}
