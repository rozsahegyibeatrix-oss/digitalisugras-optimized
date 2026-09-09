import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import LeapButton from "@/components/LeapButton";

const CLIENTS = ["Coupé Barber", "Atelier V", "Kirembe Adventures", "Pai Striking Academy", "Budapest", "Zanzibár", "Phnom Penh"];
const SET = [...CLIENTS, ...CLIENTS, ...CLIENTS];

export default function Hero({ onOpenLead }) {
  const { t } = useI18n();
  const H = t.hero;
  return (
    <section id="top" className="pt-28 sm:pt-40 pb-0">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mono-tag mb-6"
        >
          {H.tag}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-heading text-[2.6rem] sm:text-7xl lg:text-8xl leading-[1.0] tracking-tight text-ink max-w-5xl text-balance"
        >
          {H.headline}
        </motion.h1>

        <div className="mt-8 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-base sm:text-lg text-muted-fg max-w-md leading-relaxed"
          >
            {H.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap items-center gap-4"
          >
            <LeapButton onClick={onOpenLead}>{H.cta}</LeapButton>
            <span className="text-sm text-silver">{H.ctaSub}</span>
          </motion.div>
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-px bg-silver/40 border border-silver/40 rounded-xl overflow-hidden">
          {H.chips.map((c, i) => (
            <motion.div
              key={c.k}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
              className="group bg-ice p-5 hover:bg-white transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] text-silver">0{i + 1}</span>
                <span className="h-px w-6 bg-cobalt group-hover:w-10 transition-all duration-300" />
              </div>
              <div className="font-semibold text-ink">{c.k}</div>
              <div className="text-sm text-muted-fg mt-1">{c.v}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Client marquee — real client names, pauses on hover */}
      <div className="border-y border-silver/50 py-4 overflow-hidden select-none">
        <div className="marquee-track flex w-max">
          {[...SET, ...SET].map((c, i) => (
            <span key={i} className="flex items-center mono-tag whitespace-nowrap">
              <span className="px-6">{c}</span>
              <span className="w-1 h-1 rounded-full bg-cobalt shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

