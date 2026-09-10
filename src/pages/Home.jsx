import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { I18nProvider, useI18n } from "@/lib/i18n";
import Nav from "@/components/Nav";
import LeadFormModal from "@/components/LeadFormModal";
import LeapButton from "@/components/LeapButton";
import Hero from "@/components/sections/Hero";
import LaunchOffer from "@/components/sections/LaunchOffer";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
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
      <CheckoutBanner />
      <main>
        <Hero onOpenLead={openLead} />
        <LaunchOffer />
        <Portfolio />
        <Testimonials />
        <HowItWorks onOpenLead={openLead} />
        <Benefits />
        <Trust />
        <Pricing />
        <FAQ />
      </main>
      <Footer onOpenLead={openLead} />

      {/* Floating CTA */}
      <FloatingCTA onOpenLead={openLead} label={t.nav.cta} />

      <LeadFormModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  );
}

function CheckoutBanner() {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("checkout");
  if (status !== "success" && status !== "cancelled") return null;

  const isSuccess = status === "success";
  const close = () => {
    const next = new URLSearchParams(searchParams);
    next.delete("checkout");
    next.delete("plan");
    setSearchParams(next, { replace: true });
  };

  return (
    <div
      className={`fixed top-16 inset-x-0 z-40 flex items-center justify-center gap-3 px-5 py-3 text-sm text-center shadow-sm ${
        isSuccess ? "bg-cobalt text-white" : "bg-ice text-ink border-b border-silver/50"
      }`}
    >
      <span>{isSuccess ? t.checkout.success : t.checkout.cancelled}</span>
      <button onClick={close} aria-label={t.lead.close} className="shrink-0 opacity-80 hover:opacity-100">
        <X className="w-4 h-4" />
      </button>
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

