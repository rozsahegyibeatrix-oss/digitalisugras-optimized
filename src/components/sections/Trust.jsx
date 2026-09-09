import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ICONS = [ShieldCheck, UserCheck, Globe];

export default function Trust() {
  const { t } = useI18n();
  const T = t.trust;
  return (
    <section className="py-20 sm:py-28 bg-white border-y border-silver/40">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="mono-tag mb-4">{T.tag}</div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink max-w-2xl mb-14 text-balance">{T.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {T.items.map((it, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={it.t}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-2xl border border-silver/50 hover:border-cobalt/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-cobalt/10 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-cobalt" />
                </div>
                <h3 className="font-semibold text-ink text-lg">{it.t}</h3>
                <p className="text-sm text-muted-fg mt-2 leading-relaxed">{it.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

