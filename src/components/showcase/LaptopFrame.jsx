import React from "react";
import BrowserFrame from "@/components/showcase/BrowserFrame";

// Laptop-style display: browser window inside a bezel with a base hinge
export default function LaptopFrame({ url, children }) {
  return (
    <div className="w-full select-none">
      <div className="rounded-xl bg-white border border-silver/70 p-1.5 shadow-sm">
        <BrowserFrame url={url}>{children}</BrowserFrame>
      </div>
      <div className="relative h-2.5 -mt-px bg-gradient-to-b from-[#e8eaec] to-[#d1d5db] rounded-b-xl">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1/4 h-1.5 bg-[#c4c8cc] rounded-b-md" />
      </div>
    </div>
  );
}

