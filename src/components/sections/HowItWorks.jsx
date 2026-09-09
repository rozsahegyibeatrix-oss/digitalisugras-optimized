import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import LeapButton from "@/components/LeapButton";

export default function HowItWorks({ onOpenLead }) {
  const { t } = useI18n();
  const H = t.how;
  return (
    <section id="how" className="py-20 sm:py-28 bg-white border-y border-silver/40">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="mono-tag mb-4">{H.tag}</div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink max-w-2xl mb-14 text-balance">{H.title}</h2>

        <div className="grid md:grid-cols-3 gap-px bg-silver/40 border border-silver/40 rounded-2xl overflow-hidden">
          {H.steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-ice p-7 sm:p-8 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-2xl text-cobalt">{s.n}</span>
                <span className="h-px flex-1 bg-silver" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">{s.t}</h3>
              <p className="text-muted-fg text-sm leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <p className="text-ink text-lg max-w-xl">{H.rest}</p>
          <LeapButton onClick={onOpenLead}>{t.nav.cta}</LeapButton>
        </div>
      </div>
    </section>
  );
}

