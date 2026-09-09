import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LeapButton from "@/components/LeapButton";

export default function Pricing({ onOpenLead }) {
  const { t, lang } = useI18n();
  const P = t.pricing;
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-white border-y border-silver/40">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="mono-tag mb-4">{P.tag}</div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink max-w-xl text-balance">{P.title}</h2>
          <p className="text-muted-fg max-w-sm">{P.sub}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {P.tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col p-7 sm:p-8 rounded-2xl border transition-all ${
                tier.popular
                  ? "border-cobalt bg-ice shadow-lg md:-translate-y-3"
                  : "border-silver/50 bg-ice hover:border-silver"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cobalt text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full">
                  {lang === "en" ? "Most popular" : "Legnépszerűbb"}
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-semibold text-ink">{tier.name}</h3>
                {tier.popular && <span className="w-2 h-2 rounded-full bg-cobalt" />}
              </div>
              <p className="text-sm text-muted-fg mt-1.5 min-h-[2.5rem]">{tier.desc}</p>
              <div className="mt-5 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight text-ink">{tier.price}</span>
                <span className="text-sm text-muted-fg mb-1">{tier.period}</span>
              </div>
              <ul className="mt-7 space-y-3 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-ink">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-cobalt/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-cobalt" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <LeapButton
                  onClick={onOpenLead}
                  variant={tier.popular ? "primary" : "outline"}
                  className="w-full justify-center"
                >
                  {P.cta}
                </LeapButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

