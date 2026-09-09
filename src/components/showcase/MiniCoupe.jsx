import React from "react";

// Faithful recreation of https://coupebarber.com/ (live site)
export default function MiniCoupe() {
  return (
    <div className="h-full flex flex-col bg-white text-[#333] select-none">
      <nav className="flex items-center justify-between gap-2 px-3 py-2 border-b border-[#eee]">
        <span className="font-bold text-[#FF6600] text-[9px]">COUPÉ®</span>
        <div className="flex gap-2 text-[6px] tracking-wider text-[#666] overflow-hidden whitespace-nowrap">
          <span>FŐOLDAL</span><span>RÓLUNK</span><span>SZOLGÁLTATÁSOK</span><span>VÉLEMÉNYEK</span><span>GYIK</span><span>KAPCSOLAT</span>
        </div>
        <span className="bg-[#FF6600] text-white text-[6px] px-1.5 py-1 whitespace-nowrap">IDŐPONTFOGLALÁS</span>
      </nav>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-1.5">
        <h1 className="text-2xl font-bold text-[#FF6600] tracking-tight leading-none">COUPÉ</h1>
        <div className="text-[7px] tracking-[0.35em] text-[#FF6600]">BARBER SHOP</div>
        <p className="text-[7px] text-[#666] leading-relaxed max-w-[250px] mt-1">
          PREMIUM BARBER SHOP A FERENC KÖRÚTON. EGY OLYAN KÖZÖSSÉGI TÉR, AMI MEG KÍSÉREL MINDENT ÖSSZEFOGNI, AMI A BORBÉLY KULTÚRÁNK RÉSZE.
        </p>
        <span className="mt-1.5 border border-[#FF6600] text-[#FF6600] text-[7px] px-2.5 py-1 whitespace-nowrap">
          SZOLGÁLTATÁSOK & ÁRAK
        </span>
      </div>
    </div>
  );
}

