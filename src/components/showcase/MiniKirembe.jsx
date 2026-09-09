import React from "react";

// Faithful recreation of https://kirembeadventures.online/ (live site) — built for phone frame.
// Static only (no embedded video): this renders instantly while the real clip is
// lazy-loaded and layered on top by <LazyVideo> in Portfolio.jsx. Loading a second,
// unconditional copy of the video here would double the network/CPU cost for this card.
export default function MiniKirembe() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#3a4a5a] via-[#5a6b74] to-[#1a2530] select-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      <div className="relative h-full flex flex-col p-2.5 pt-5">
        <div className="flex items-center justify-between text-[5px]">
          <span className="text-white font-medium">Kirembe · Adventure</span>
          <span className="bg-[#00e5ff] text-black px-1.5 py-0.5 rounded-full text-[5px] font-semibold whitespace-nowrap">
            Book a session
          </span>
        </div>
        <div className="flex-1" />
        <div className="space-y-1 pb-1">
          <div className="text-[5px] tracking-[0.2em] text-[#50d8e8]">PAJE · ZANZIBAR · INDIAN OCEAN</div>
          <div className="text-[11px] font-bold text-white leading-tight">
            Ride the wind.<br />Chase the horizon.
          </div>
          <div className="text-[5.5px] text-white/80 leading-snug">
            Kite surfing lessons and guiding on Zanzibar's wind-kissed east coast.
          </div>
          <div className="flex gap-1.5 pt-0.5">
            <span className="bg-[#00e5ff] text-black text-[5px] font-semibold px-2 py-1 rounded-full whitespace-nowrap">
              Check wind & availability
            </span>
            <span className="border border-white/70 text-white text-[5px] px-2 py-1 rounded-full whitespace-nowrap">
              View gallery
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

