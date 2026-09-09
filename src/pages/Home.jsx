import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import Nav from "@/components/Nav";
import LeadFormModal from "@/components/LeadFormModal";
import LeapButton from "@/components/LeapButton";
import Hero from "@/components/sections/Hero";
import LaunchOffer from "@/components/sections/LaunchOffer";
import Portfolio from "@/components/sections/Portfolio";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Trust from "@/components/sections/Trust";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

function HomeContent() {
  const { t } = useI18n();
  const [leadOpen, setLeadOpen] = useState(false);
  const openLead = () => setLeadOpen(true);

  return (
    <div className="min-h-screen bg-ice">
      <Nav onOpenLead={openLead} />
      <main>
        <Hero onOpenLead={openLead} />
        <LaunchOffer onOpenLead={openLead} />
        <Portfolio />
        <HowItWorks onOpenLead={openLead} />
        <Benefits />
        <Trust />
        <Pricing onOpenLead={openLead} />
        <FAQ />
      </main>
      <Footer onOpenLead={openLead} />

      {/* Floating CTA */}
      <FloatingCTA onOpenLead={openLead} label={t.nav.cta} />

      <LeadFormModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  );
}

function FloatingCTA({ onOpenLead, label }) {
  const [show, setShow] = useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 700 && window.scrollY < document.body.scrollHeight - window.innerHeight - 600);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-5 right-5 z-40 sm:hidden"
        >
          <LeapButton onClick={onOpenLead} className="text-sm shadow-xl">
            {label}
          </LeapButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <HomeContent />
    </I18nProvider>
  );
}

