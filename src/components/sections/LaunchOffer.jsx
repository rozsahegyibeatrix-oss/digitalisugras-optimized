import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import LeapButton from "@/components/LeapButton";

export default function LaunchOffer({ onOpenLead }) {
  const { t } = useI18n();
  const O = t.offer;
  return (
    <section className="relative py-16 sm:py-24 bg-ink text-ice">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="mono-tag text-silver/70 mb-8">{O.tag}</div>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="text-sm text-silver/80 mb-2">{O.title}</div>
            <div className="flex items-end gap-4">
              <span className="text-silver/50 text-2xl line-through font-mono">{O.old}</span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-5xl sm:text-6xl font-semibold tracking-tight"
              >
                {O.now}
              </motion.span>
            </div>
            <p className="text-silver/80 mt-3 text-sm">{O.note}</p>
            <div className="mt-8">
              <LeapButton onClick={onOpenLead} variant="outline" className="border-ice/40 text-ice hover:bg-ice hover:text-ink">
                {t.nav.cta}
              </LeapButton>
            </div>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-silver/20 lg:pl-16">
            <h3 className="text-xl font-semibold mb-5">{O.whyTitle}</h3>
            <div className="space-y-5">
              {[O.why1, O.why2].map((w, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-mono text-[11px] text-cobalt mt-1 shrink-0">0{i + 1}</span>
                  <p className="text-silver/90 leading-relaxed">{w}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-silver/20">
              <p className="text-silver/70 text-sm italic">{O.honest}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

