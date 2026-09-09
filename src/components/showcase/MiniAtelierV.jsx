import React from "react";

// Faithful recreation of https://atelierv.space/ (live site)
export default function MiniAtelierV() {
  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] text-white px-4 py-3 relative overflow-hidden select-none">
      <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-white/5 blur-xl" />
      <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-[#a68962]/10 blur-xl" />
      <div className="flex items-center justify-between text-[7px] tracking-[0.2em] relative">
        <span className="font-semibold">ATELIER V</span>
        <span className="text-white/60">V. KERÜLET · BELVÁROS</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 relative">
        <div className="text-[6px] tracking-[0.25em] text-white/80">
          PRIVÁT IDEGRENDSZERI & SZOMATIKUS REGENERÁCIÓ
        </div>
        <div className="font-serif text-lg leading-tight">
          CSEND ÉS TELJESÍTMÉNY<br />
          <span className="text-[#a68962]">EGYENSÚLYA</span>
        </div>
        <p className="text-[6.5px] text-white/60 leading-relaxed max-w-[270px]">
          Kizárólagos 1:1 szomatikus jóga és mélyszöveti feszültségoldás vezetőknek és vállalkozóknak. Szüntesd meg a krónikus stresszt egy diszkrét, 19. századi belvárosi rezidencián.
        </p>
        <span className="border border-white/60 text-[6px] px-2 py-1 tracking-wider whitespace-nowrap">
          IDŐPONT EGYEZTETÉS (PRIVÁT HÍVÁS)
        </span>
      </div>
    </div>
  );
}

