import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const EMAIL = "digitalisugras@gmail.com";

export default function LeadFormModal({ open, onClose }) {
  const { t } = useI18n();
  const L = t.lead;
  const [business, setBusiness] = useState("");
  const [pain, setPain] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`[Digitális Ugrás] Új jelentkezés${name ? ` — ${name}` : ""}`);
    const body = encodeURIComponent(
      `Név: ${name || "-"}\n` +
      `1. Vállalkozás és helyszín: ${business || "-"}\n` +
      `2. Legnagyobb marketing probléma: ${pain || "-"}\n` +
      `3. Legjobb elérhetőség: ${contact || "-"}\n`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setFailed(false);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, business, pain, contact }),
      });
      if (!res.ok) throw new Error("send failed");
      setSent(true);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative w-full max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto bg-ice rounded-2xl border border-silver/60 shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-silver/50">
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-silver uppercase">{t.nav.tag ?? "AI_NODE"}</div>
                <h3 className="text-xl font-semibold text-ink mt-0.5">{L.title}</h3>
                <p className="text-sm text-muted-fg mt-1">{L.sub}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-silver/30 text-ink transition-colors"
                aria-label={L.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {sent ? (
              <div className="px-6 py-12 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-cobalt/10 flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-cobalt" />
                </div>
                <p className="text-ink font-medium">{L.success}</p>
                <button
                  onClick={onClose}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-cobalt hover:underline"
                >
                  {L.close} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                <Field label={L.q1}>
                  <input
                    required
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    placeholder={L.q1p}
                    className="lead-input"
                  />
                </Field>
                <Field label={L.q2}>
                  <input
                    required
                    value={pain}
                    onChange={(e) => setPain(e.target.value)}
                    placeholder={L.q2p}
                    className="lead-input"
                  />
                </Field>
                <Field label={L.q3}>
                  <input
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={L.q3p}
                    className="lead-input"
                  />
                </Field>
                <Field label={L.name}>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={L.nameP}
                    className="lead-input"
                  />
                </Field>
                {failed && (
                  <p className="text-sm text-red-600">
                    {L.error}{" "}
                    <button type="button" onClick={mailtoFallback} className="underline">
                      {EMAIL}
                    </button>
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-cobalt text-white py-3.5 rounded-xl font-semibold hover:bg-cobalt-dark transition-colors disabled:opacity-60"
                >
                  {sending ? L.sending : L.submit} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-silver mb-1.5">{label}</span>
      {children}
    </label>
  );
}

