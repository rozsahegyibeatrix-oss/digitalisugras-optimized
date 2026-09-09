import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";
import LeapButton from "@/components/LeapButton";

export default function Nav({ onOpenLead }) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { l: t.nav.work, h: "#work" },
    { l: t.nav.how, h: "#how" },
    { l: t.nav.pricing, h: "#pricing" },
    { l: t.nav.faq, h: "#faq" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ice/85 backdrop-blur-md border-b border-silver/40" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-2.5 h-2.5 rounded-full bg-cobalt group-hover:scale-125 transition-transform" />
          <span className="font-semibold tracking-tight text-ink">Digitális Ugrás</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((lnk) => (
            <a
              key={lnk.h}
              href={lnk.h}
              className="text-sm text-muted-fg hover:text-ink transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-cobalt hover:after:w-full after:transition-all after:duration-300"
            >
              {lnk.l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <div className="hidden sm:block">
            <LeapButton onClick={onOpenLead} className="text-sm">
              {t.nav.cta}
            </LeapButton>
          </div>
          <button
            className="md:hidden p-1 text-ink"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-ice border-b border-silver/40 px-5 py-4 space-y-3"
        >
          {links.map((lnk) => (
            <a
              key={lnk.h}
              href={lnk.h}
              onClick={() => setOpen(false)}
              className="block text-sm text-ink py-1"
            >
              {lnk.l}
            </a>
          ))}
          <div className="flex items-center justify-between pt-2">
            <LanguageToggle />
            <LeapButton onClick={() => { setOpen(false); onOpenLead(); }} className="text-sm">
              {t.nav.cta}
            </LeapButton>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

