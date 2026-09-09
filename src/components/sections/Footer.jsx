import React from "react";
import { useI18n } from "@/lib/i18n";
import LeapButton from "@/components/LeapButton";

export default function Footer({ onOpenLead }) {
  const { t } = useI18n();
  const F = t.footer;
  return (
    <footer className="bg-ink text-ice pt-20 sm:pt-28 pb-10">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="mono-tag text-silver/70 mb-6">{F.tag}</div>
        <p className="max-w-2xl text-lg sm:text-xl text-silver/90 leading-relaxed mb-12">{F.mission}</p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-16">
          <LeapButton onClick={onOpenLead}>{t.nav.cta}</LeapButton>
        </div>

        <a
          href="mailto:digitalisugras@gmail.com"
          className="block font-heading font-semibold tracking-tight text-ice hover:text-cobalt transition-colors leading-[0.95]"
          style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)" }}
        >
          digitalisugras@gmail.com
        </a>

        <div className="mt-16 pt-8 border-t border-silver/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-silver/60 text-sm">{F.rights}</p>
          <nav className="flex flex-wrap gap-6">
            {F.links.map((l) => (
              <a key={l.h} href={l.h} className="text-sm text-silver/80 hover:text-ice transition-colors">
                {l.l}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

