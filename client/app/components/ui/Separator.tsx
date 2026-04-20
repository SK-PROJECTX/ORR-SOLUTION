"use client";

import React from "react";

interface SeparatorProps {
  text?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ text }) => {
  return (
    <div className="relative flex items-center py-6 w-full">
      <div className="flex-grow border-t border-gray-400/30"></div>
      {text && (
        <span className="flex-shrink mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">
          {text}
        </span>
      )}
      <div className="flex-grow border-t border-gray-400/30"></div>
    </div>
  );
};
