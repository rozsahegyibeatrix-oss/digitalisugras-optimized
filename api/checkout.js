import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// HUF is a zero-decimal currency in Stripe — unit_amount is the forint amount directly.
const PLANS = {
  launch: { name: "Indító csomag — Digitális Ugrás", amount: 89000, mode: "payment" },
  basic: { name: "Basic csomag — Digitális Ugrás", amount: 54000, mode: "subscription" },
  standard: { name: "Standard csomag — Digitális Ugrás", amount: 79000, mode: "subscription" },
  pro: { name: "Pro csomag — Digitális Ugrás", amount: 89000, mode: "subscription" },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { plan } = req.body || {};
  const config = PLANS[plan];
  if (!config) {
    return res.status(400).json({ error: "Unknown plan" });
  }

  const origin = req.headers.origin || `https://${req.headers.host}`;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: config.mode,
      line_items: [
        {
          price_data: {
            currency: "huf",
            unit_amount: config.amount,
            product_data: { name: config.name },
            ...(config.mode === "subscription" ? { recurring: { interval: "month" } } : {}),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?checkout=success&plan=${plan}`,
      cancel_url: `${origin}/?checkout=cancelled&plan=${plan}`,
    });
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(502).json({ error: "Checkout session failed" });
  }
}
