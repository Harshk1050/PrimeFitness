"use client";

import { useState } from "react";

export default function ExpandableDescription({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div
        className={`text-zinc-600 leading-relaxed overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-none" : "max-h-32"
        }`}
      >
        <p>{text}</p>
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-sm text-sky-500 hover:underline"
      >
        {isExpanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
