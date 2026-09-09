import React from "react";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Benefits() {
  const { t } = useI18n();
  const B = t.benefits;
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="mono-tag mb-4">{B.tag}</div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink max-w-2xl mb-14 text-balance">{B.title}</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-silver/40 border border-silver/40 rounded-2xl overflow-hidden">
          {B.items.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="bg-ice p-6 hover:bg-white transition-colors group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-cobalt group-hover:scale-150 transition-transform" />
                <span className="font-mono text-[10px] text-silver">0{i + 1}</span>
              </div>
              <h3 className="font-semibold text-ink">{it.t}</h3>
              <p className="text-sm text-muted-fg mt-1.5 leading-relaxed">{it.d}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive local-search demo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 rounded-2xl border border-silver/50 bg-white p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-cobalt" />
            <span className="mono-tag">{B.mapTitle}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-3 flex-1 rounded-xl border border-silver/50 px-4 py-3 hover:border-cobalt/50 transition-colors">
              <Search className="w-4 h-4 text-muted-fg shrink-0" />
              <span className="text-sm text-ink">{B.mapQuery}</span>
            </div>
            <span className="flex items-center gap-1.5 justify-center">
              <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
              <span className="font-mono text-[10px] text-silver tracking-widest uppercase">Budapest</span>
            </span>
          </div>
          <div className="mt-3 rounded-xl bg-ice border border-silver/40 px-4 py-3 max-w-md">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-cobalt/15 flex items-center justify-center text-[10px] font-mono text-cobalt shrink-0">1</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-ink">Te üzleted</div>
                <div className="text-xs text-muted-fg">Helyi találat · Google</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}