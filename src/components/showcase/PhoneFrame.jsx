import React from "react";

export default function PhoneFrame({ children }) {
  return (
    <div className="w-full aspect-[9/17.5] rounded-[1.4rem] sm:rounded-[1.8rem] bg-ink p-[4px] sm:p-[6px] shadow-xl border border-ink/80">
      <div className="relative h-full rounded-[1.1rem] sm:rounded-[1.45rem] overflow-hidden bg-black">
        <div className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-7 sm:w-12 h-2.5 sm:h-4 bg-black rounded-full z-20 flex items-center justify-center">
          <span className="w-3 sm:w-6 h-1 sm:h-1.5 bg-[#1a1a1a] rounded-full" />
        </div>
        {/* The mockups inside are laid out for a ~140px-wide screen. Rather than
            restyling them per breakpoint, render them at that fixed design width and
            scale the whole screen down — keeps type and spacing in proportion. */}
        <div className="absolute top-0 left-0 w-[140px] aspect-[9/17.5] origin-top-left scale-[0.478] sm:scale-[0.707] lg:scale-100">
          {children}
        </div>
      </div>
    </div>
  );
}

