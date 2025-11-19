// components/GlowCard.tsx
import React from "react";
import clsx from "clsx";

type GlowPos = "bottom-right" | "bottom-left" | "top-right" | "top-left";
type Props = {
  children: React.ReactNode;
  glowPosition?: GlowPos;
  showPins?: boolean;
  className?: string;
};

export default function GlowCard({ children, glowPosition = "bottom-right", showPins = true, className = "" }: Props) {
  const glowClass = `glow-${glowPosition}`;
  return (
    <div className={clsx("relative", className)}>
      <div className={clsx("glassy-card glow-corner", glowClass)}>
        {showPins && <div className="glow-pin pin-top" />}
        {showPins && <div className="glow-pin pin-bottom" />}
        <div className="relative z-20">
          {children}
        </div>
      </div>
    </div>
  );
}
