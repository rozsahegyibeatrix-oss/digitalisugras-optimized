import React from "react";
import { ArrowRight } from "lucide-react";

export default function LeapButton({ onClick, children, variant = "primary", className = "" }) {
  const base =
    "group inline-flex items-center gap-2 font-semibold transition-all duration-300 rounded-full";
  const styles = {
    primary: "bg-cobalt text-white px-6 py-3.5 hover:bg-cobalt-dark shadow-sm hover:shadow-md",
    outline: "border border-ink/80 text-ink px-6 py-3.5 hover:bg-ink hover:text-ice",
    ghost: "text-ink px-2 py-1 hover:text-cobalt",
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}