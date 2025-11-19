// components/SectionTitle.tsx
import React from "react";

type Props = { title: string; highlight?: string };

export default function SectionTitle({ title, highlight }: Props) {
  // highlight: the word to color neon-green (if present)
  if (!highlight) {
    return <h2 className="h2-title text-center text-white font-extrabold my-6">{title}</h2>;
  }

  const parts = title.split(highlight);
  return (
    <h2 className="h2-title text-center font-extrabold my-6">
      <span className="text-white">{parts[0]}</span>
      <span className="text-[#47ff4c]">{highlight}</span>
      <span className="text-white">{parts[1] ?? ""}</span>
    </h2>
  );
}
