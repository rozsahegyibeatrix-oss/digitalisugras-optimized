import React from "react";

export default function BrowserFrame({ url, children }) {
  return (
    <div className="w-full rounded-lg border border-silver/60 bg-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2.5 h-6 sm:h-7 bg-[#F1F3F4] border-b border-silver/50">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5F57] flex-shrink-0" />
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FEBC2E] flex-shrink-0" />
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#28C840] flex-shrink-0" />
        <div className="flex-1 min-w-0 rounded-md bg-white border border-silver/50 text-[7px] sm:text-[8px] text-muted-fg px-1.5 sm:px-2 py-0.5 text-center truncate font-mono">
          {url}
        </div>
      </div>
      <div className="aspect-[19/10] overflow-hidden">{children}</div>
    </div>
  );
}

