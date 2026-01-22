"use client";

import { useState } from "react";

interface DescriptionSectionProps {
  description: string;
}

export default function DescriptionSection({
  description,
}: DescriptionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 400;
  const shouldTruncate = description.length > maxLength;

  const displayText =
    shouldTruncate && !isExpanded
      ? description.slice(0, maxLength) + "..."
      : description;

  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="font-barlow text-3xl text-[#2a5b57] mb-4">Description</h2>
      <div>
        <p
          className="text-gray-600 text-sm leading-relaxed whitespace-pre-line inline"
          dangerouslySetInnerHTML={{
            __html: displayText.replace(/\n/g, "<br>"),
          }}
        />
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#075E5E] font-semibold text-sm mt-2 hover:underline"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    </section>
  );
}
