import { Resend } from "resend";

const TO_EMAIL = "digitalisugras@gmail.com";
// Resend's shared sandbox sender — works without a verified domain.
// Once a domain is verified in Resend, swap this for something like
// "Digitális Ugrás <hello@digitalisugras.hu>".
const FROM_EMAIL = "Digitális Ugrás <onboarding@resend.dev>";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, business, pain, contact } = req.body || {};
  if (!business || !pain || !contact) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const looksLikeEmail = /\S+@\S+\.\S+/.test(contact);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: looksLikeEmail ? contact : undefined,
      subject: `[Digitális Ugrás] Új jelentkezés${name ? ` — ${name}` : ""}`,
      text:
        `Név: ${name || "-"}\n` +
        `Vállalkozás és helyszín: ${business}\n` +
        `Legnagyobb marketing probléma: ${pain}\n` +
        `Legjobb elérhetőség: ${contact}\n`,
    });
    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: "Email send failed" });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(502).json({ error: "Email send failed" });
  }
}
