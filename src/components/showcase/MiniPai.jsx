import React from "react";

// Faithful recreation of https://www.paistrinkingacademy.space/ (live site)
export default function MiniPai() {
  return (
    <div className="h-full flex flex-col bg-[#0d0d0d] text-white relative overflow-hidden select-none">
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 text-[5px] text-white/30 tracking-widest"
        style={{ writingMode: "vertical-rl" }}
      >
        11.5447° N, 104.8922° E
      </div>
      <nav className="flex items-center justify-between gap-2 px-3 py-2 border-b border-white/10">
        <div className="overflow-hidden">
          <div className="text-[8px] font-bold leading-none">PAI STRIKING</div>
          <div className="text-[5px] text-white/50 tracking-[0.2em] mt-0.5">ACADEMY · PHNOM PENH</div>
        </div>
        <div className="flex gap-2 text-[5px] tracking-widest text-white/70 whitespace-nowrap overflow-hidden">
          <span>SERVICES</span><span>COACH</span><span>PRICING</span><span>GALLERY</span><span>CONTACT</span>
        </div>
        <span className="bg-[#FF5700] text-white text-[5.5px] px-1.5 py-1 whitespace-nowrap">BOOK TRIAL · $10</span>
      </nav>
      <div className="flex-1 flex flex-col justify-center px-4 gap-1.5">
        <div className="text-[5px] tracking-[0.25em] text-[#808080]">// THE STRIKING GRID</div>
        <div className="text-xl font-extrabold leading-tight tracking-tight">
          TRAIN HARD.<br />FIGHT SMART.
        </div>
        <p className="text-[6px] text-white/60 leading-relaxed max-w-[300px]">
          Boxing, kickboxing and MMA with <span className="font-bold text-white">Coach Pai</span>. Technique first, power second — build your striking grid.
        </p>
        <div className="flex gap-1.5 pt-0.5">
          <span className="bg-[#FF5700] text-[6px] px-2 py-1 font-semibold whitespace-nowrap">BOOK TRIAL SESSION · $10</span>
          <span className="border border-white/40 text-[6px] px-2 py-1 whitespace-nowrap">VIEW PROGRAMS</span>
        </div>
      </div>
    </div>
  );
}

