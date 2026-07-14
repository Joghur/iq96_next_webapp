"use client";

import { type ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  text?: string | string[];
  position?: "left" | "right" | "bottom" | "top";
}

const positionClasses: Record<string, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const Tooltip = ({ children, text, position = "top" }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onTouchStart={() => setShowTooltip(true)}
      onTouchEnd={() => setShowTooltip(false)}
    >
      <div>{children}</div>
      {showTooltip && text && (
        <div
          className={`absolute z-50 max-w-xs rounded-md bg-gray-900 px-3 py-2 text-sm text-white shadow-lg ${positionClasses[position]}`}
        >
          {typeof text === "string"
            ? text
            : text.map((textpart, index) => <p key={index}>{textpart}</p>)}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
