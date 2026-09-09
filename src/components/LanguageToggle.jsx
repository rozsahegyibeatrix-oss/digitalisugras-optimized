import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();
  const isHu = lang === "hu";
  return (
    <div className="flex items-center gap-1 font-mono text-[11px] tracking-[0.2em] uppercase select-none">
      <span
        className={`cursor-pointer transition-colors ${isHu ? "text-ink" : "text-silver hover:text-ink"}`}
        onClick={() => setLang("hu")}
      >
        HU
      </span>
      <div
        className="relative w-9 h-4 rounded-full border border-silver/70 cursor-pointer flex items-center"
        onClick={() => setLang(isHu ? "en" : "hu")}
        aria-label="Toggle language"
      >
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cobalt"
          animate={{ left: isHu ? 2 : 22 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
      <span
        className={`cursor-pointer transition-colors ${!isHu ? "text-ink" : "text-silver hover:text-ink"}`}
        onClick={() => setLang("en")}
      >
        EN
      </span>
    </div>
  );
}

