import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const { t } = useI18n();
  const Te = t.testimonials;
  return (
    <section className="py-20 sm:py-28 bg-ice">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="mono-tag mb-4">{Te.tag}</div>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink max-w-2xl mb-14 text-balance">{Te.title}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {Te.items.map((it, i) => (
            <motion.figure
              key={it.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col p-7 rounded-2xl border border-silver/50 bg-white"
            >
              <blockquote className="text-ink leading-relaxed flex-1">&ldquo;{it.q}&rdquo;</blockquote>
              <figcaption className="flex items-center gap-3 mt-6">
                <img
                  src={`https://placehold.co/64x64/2D5BFF/fff?text=${initials(it.name)}`}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  className="w-10 h-10 rounded-full shrink-0"
                />
                <div>
                  <div className="text-sm font-semibold text-ink">{it.name}</div>
                  <div className="text-xs text-muted-fg">{it.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
