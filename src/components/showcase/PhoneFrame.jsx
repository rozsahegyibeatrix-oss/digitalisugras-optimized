import React from "react";

export default function PhoneFrame({ children }) {
  return (
    <div className="h-full aspect-[9/19] rounded-[1.8rem] bg-ink p-[6px] shadow-xl border border-ink/80">
      <div className="relative h-full rounded-[1.45rem] overflow-hidden bg-black">
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-4 bg-black rounded-full z-20 flex items-center justify-center">
          <span className="w-6 h-1.5 bg-[#1a1a1a] rounded-full" />
        </div>
        {children}
      </div>
    </div>
  );
}

