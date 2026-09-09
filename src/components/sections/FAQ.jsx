import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function FAQ() {
  const { t } = useI18n();
  const F = t.faq;
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="mono-tag mb-4">{F.tag}</div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink text-balance">{F.title}</h2>
        </div>
        <div className="lg:col-span-8">
          <div className="border-t border-silver/50">
            {F.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-silver/50">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                  >
                    <span className="font-medium text-ink text-lg group-hover:text-cobalt transition-colors">{item.q}</span>
                    <span className={`shrink-0 w-8 h-8 rounded-full border border-silver flex items-center justify-center transition-all ${isOpen ? "bg-cobalt border-cobalt text-white rotate-45" : "text-ink"}`}>
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-muted-fg leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

