import { useState } from "react";
import { I18nProvider } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import LeadFormModal from "@/components/LeadFormModal";

function SectionPageContent({ Section }) {
  const [leadOpen, setLeadOpen] = useState(false);
  const openLead = () => setLeadOpen(true);
  return (
    <div className="min-h-screen bg-ice">
      <Nav onOpenLead={openLead} />
      <main className="pt-16">
        <Section onOpenLead={openLead} />
      </main>
      <Footer onOpenLead={openLead} />
      <LeadFormModal open={leadOpen} onClose={() => setLeadOpen(false)} />
    </div>
  );
}

export default function SectionPage({ Section, lang = "hu" }) {
  return (
    <I18nProvider initialLang={lang}>
      <SectionPageContent Section={Section} />
    </I18nProvider>
  );
}
