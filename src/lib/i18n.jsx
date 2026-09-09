import React, { createContext, useContext, useState, useCallback } from "react";

const translations = {
  hu: {
    nav: {
      work: "Munkák",
      how: "Folyamat",
      pricing: "Árak",
      faq: "GYIK",
      cta: "Indítsd az Ugrást",
    },
    hero: {
      tag: "BUDAPEST // DIGITÁLIS UGRÁS",
      headline: "Weboldal, hirdetések és tartalom — egy hét alatt.",
      sub: "Magyar kisvállalkozásoknak: manikűr szalonok, pékségek, borbélyok, üzletek. MI felgyorsítja a munkát, ember ellenőrzi az eredményt.",
      chips: [
        { k: "Weboldal", v: "Kész, foglalós weboldal 7 nap alatt" },
        { k: "Hirdetések", v: "Indításra kész hirdetési csomag" },
        { k: "Havi tartalom", v: "Folyamatos posztok és hirdetés-kezelés" },
      ],
      cta: "Indítsd az Ugrást",
      ctaSub: "3 kérdés — mi intézzük a többit",
    },
    offer: {
      tag: "LIMITÁLT DROP // ELSŐ 50 ÜGYFÉL",
      title: "Indító csomag",
      old: "149 000 Ft",
      now: "89 000 Ft",
      note: "Egyszeri díj az első 50 ügyfélnek.",
      whyTitle: "Miért ennyire olcsó?",
      why1: "A MI felgyorsítja a gyártást — amit korábban hetekig tartott, most napok alatt kész.",
      why2: "Ez a korai ügyfél-ár: az első 50 munka építi a portfóliónkat, ezért neked kedvezünk.",
      honest: "Nincs rejtett költség. Nincs kötelező havi szerződés a indítás után.",
    },
    work: {
      tag: "PORTFÓLIO // VALÓDI MUNKA",
      title: "Valódi munka. Valódi eredmény.",
      sub: "Nem demó — élesben futó weboldalak és hirdetések valós vállalkozásoknak.",
      items: [
        {
          name: "Coupé Barber",
          type: "Borbélyüzlet · Budapest",
          chip: "Fresha foglalás integrálva",
          desc: "Premium borbélyüzlet a Ferenc körúton. Valós árazás és online időpontfoglalás.",
        },
        {
          name: "Atelier V",
          type: "Prémium jóga stúdió · Budapest",
          chip: "Privát foglalási rendszer",
          desc: "Kizárólagos 1:1 szomatikus jóga vezetőknek egy diszkrét belvárosi rezidencián.",
        },
        {
          name: "Kirembe Adventures",
          type: "Kitesurfing · Zanzibár",
          chip: "Valós videohirdetés",
          desc: "Kitesurf oktatás és vezetés Zanzibár keleti partján. Videóhirdetés élesben.",
        },
        {
          name: "Pai Striking Academy",
          type: "Box / Kickbox terem · Phnom Penh",
          chip: "Saját termék",
          desc: "Box, kickbox és MMA edzőterem. Próbaidőpont-foglalás és programtár.",
        },
      ],
      videoLabel: "Kirembe · videohirdetés",
      visit: "Megnézem élesben",
      live: "Élő oldal",
      desktopView: "Asztali",
      phoneView: "Mobil",
    },
    how: {
      tag: "FOLYAMAT // 3 KÉRDÉS",
      title: "Te válaszolsz három kérdésre. Mi intézzük a többit.",
      steps: [
        { n: "01", t: "Vállalkozás és helyszín", d: "Mit csinálsz és hol? Ennyi elég a weboldal és a hirdetések alapjához." },
        { n: "02", t: "Legnagyobb marketing probléma", d: "Mi fáj a leginkább? Nincs weboldal? Nem találnak rád? Lassú a foglalás?" },
        { n: "03", t: "Legjobb elérhetőség", d: "Hogyan érjük el a leggyorsabban? Telefon, email vagy üzenet." },
      ],
      rest: "Utána mi készítjük a weboldalt, a hirdetéseket és a tartalmat — te csak jóváhagyod.",
    },
    benefits: {
      tag: "ELŐNYÖK // MIÉRT MI",
      title: "Miért működik ez kisvállalkozásnak",
      items: [
        { t: "Gyors indulás", d: "Hetek helyett napok. A MI lecsökkenti a gyártási időt." },
        { t: "Ember által ellenőrzött MI", d: "A gép dolgozik, de egy ember ellenőrzi és jóváhagyja minden eredményt." },
        { t: "Nincs hosszú távú szerződés", d: "Bármikor lemondod a havi csomagot. Nincs csapda." },
        { t: "Átlátható árazás", d: "Fix árak, sehol semmi rejtett költség." },
        { t: "Helyi magyar csapat", d: "Értjük a magyar piacot és a helyi keresést." },
        { t: "Ott találunk rád, ahol keresnek", d: "Google keresés optimalizálás helyi üzleteknek." },
      ],
      mapTitle: "Ott találunk rád, ahol keresnek",
      mapQuery: "Pékség a közelemben",
    },
    trust: {
      tag: "BIZALOM // ŐSZINTE ÁLLÍTÁSOK",
      title: "Csak azt ígérjük, ami igaz.",
      items: [
        { t: "GDPR-tudatos forrás", d: "A tartalom és adatok forrását az EU-s adatvédelmi elveknek megfelelően kezeljük." },
        { t: "Emberi jóváhagyás", d: "Semmi sem kerül ki úgy, hogy egy ember ne ellenőrizte volna." },
        { t: "Valódi éles munka", d: "A portfólió minden eleme élő weboldal — megnyithatod és megnézheted." },
      ],
    },
    testimonials: {
      tag: "VÉLEMÉNYEK // ÜGYFELEK",
      title: "Mit mondanak rólunk",
      items: [
        { q: "Egy hét alatt kész volt az oldal, és már jönnek a foglalások. Nem hittem, hogy ennyire egyszerű.", a: "— Budapesti manikűr szalon" },
        { q: "A hirdetéseket ők írták meg, csak jóváhagytam. Az első hónapban megtérült a költség.", a: "— Városi pékség" },
        { q: "Végre olyan marketing, amit értek és ami működik. Átlátható ár, nincs meglepetés.", a: "— Borbélyüzlet" },
      ],
    },
    pricing: {
      tag: "ÁRAK // HAVI CSOMAGOK",
      title: "Fix havi árak. Bármikor lemondható.",
      sub: "Az indító csomag után választasz havi szintet. Nincs kötelezettség.",
      tiers: [
        {
          name: "Basic",
          price: "54 000",
          period: "Ft / hó",
          desc: "A weboldal fenntartása és alap tartalom.",
          features: ["Weboldal fenntartása", "Havi 4 poszt", "Hirdetés-kezelés alap", "Email támogatás"],
          popular: false,
        },
        {
          name: "Standard",
          price: "79 000",
          period: "Ft / hó",
          desc: "A legtöbb kisvállalkozásnak ez a legjobb választás.",
          features: ["Minden a Basicben", "Havi 8 poszt", "Hirdetés-optimalizálás", "Havi teljesítmény-jelentés", "Telefonos támogatás"],
          popular: true,
        },
        {
          name: "Pro",
          price: "89 000",
          period: "Ft / hó",
          desc: "Maximális láthatóság és aktív kezelés.",
          features: ["Minden a Standardben", "Havi 12 poszt", "Kampány-kezelés és A/B teszt", "Kiemelt támogatás", "Havi konzultáció"],
          popular: false,
        },
      ],
      cta: "Ezt választom",
    },
    faq: {
      tag: "GYIK // GYAKORI KÉRDÉSEK",
      title: "Mielőtt indulsz",
      items: [
        { q: "Miért ilyen olcsó az indító csomag?", a: "Mert a MI felgyorsítja a gyártást, és az első 50 ügyfél portfólió-árat kap. Hetek helyett napok alatt készül a munka, így alacsonyabb a költség — ezt neked adjuk vissza." },
        { q: "Mennyi idő alatt lesz kész a weboldalam?", a: "Az indító csomag részeként általában 5–7 munkanap, amint megvannak a válaszok a három kérdésre." },
        { q: "Mennyibe kerül az indítás után?", a: "A havi csomagod szerint: Basic 54 000, Standard 79 000 vagy Pro 89 000 Ft. Az indító csomag egyszeri 89 000 Ft (első 50 ügyfélnek)." },
        { q: "Bármikor lemondhatom?", a: "Igen. A havi csomag bármikor lemondható, nincs hosszú távú szerződés és nincs kötelezettség." },
      ],
    },
    lead: {
      title: "Indítsd az Ugrást",
      sub: "Három kérdés — utána mi intézzük a többit.",
      q1: "Mit csinálsz és hol?",
      q1p: "Pl. manikűr szalon, Budapest XIII. kerület",
      q2: "Mi a legnagyobb marketing problémád?",
      q2p: "Pl. nincs weboldal / nem találnak rám / kevés a foglalás",
      q3: "Hogyan érjünk el a leggyorsabban?",
      q3p: "Pl. email, telefon, WhatsApp",
      name: "Neved",
      nameP: "Kovács Anna",
      submit: "Küldöm a jelentkezést",
      sending: "Küldés...",
      success: "Ezzel közelebb kerültél a digitális ugráshoz — hamarosan jelentkezünk.",
      error: "Nem sikerült elküldeni. Írj nekünk közvetlenül:",
      back: "Vissza",
      close: "Bezárás",
    },
    footer: {
      tag: "DIGITÁLIS UGRÁS // KAPCSOLAT",
      mission: "A Digitális Ugrás a magyar kisvállalkozások digitális ugrását építi — gyorsan, őszintén, emberien.",
      email: "digitalisugras@gmail.com",
      rights: "© 2026 Digitális Ugrás. Minden jog fenntartva.",
      links: [
        { l: "Munkák", h: "#work" },
        { l: "Folyamat", h: "#how" },
        { l: "Árak", h: "#pricing" },
        { l: "GYIK", h: "#faq" },
      ],
    },
  },
  en: {
    nav: {
      work: "Work",
      how: "Process",
      pricing: "Pricing",
      faq: "FAQ",
      cta: "Start Your Leap",
    },
    hero: {
      tag: "BUDAPEST // DIGITAL LEAP",
      headline: "Website, ads and content — in one week.",
      sub: "For Hungarian small businesses: nail salons, bakeries, barbershops, shops. AI speeds the work, a human checks the result.",
      chips: [
        { k: "Website", v: "A booking-ready website in 7 days" },
        { k: "Ads", v: "Launch-ready ad package" },
        { k: "Monthly content", v: "Ongoing posts and ad management" },
      ],
      cta: "Start Your Leap",
      ctaSub: "3 questions — we handle the rest",
    },
    offer: {
      tag: "LIMITED DROP // FIRST 50 CLIENTS",
      title: "Launch package",
      old: "149,000 Ft",
      now: "89,000 Ft",
      note: "One-time fee for the first 50 clients.",
      whyTitle: "Why so cheap?",
      why1: "AI speeds production — what used to take weeks now takes days.",
      why2: "This is early-client pricing: the first 50 projects build our portfolio, so we pass the saving to you.",
      honest: "No hidden cost. No long-term contract after launch.",
    },
    work: {
      tag: "PORTFOLIO // REAL WORK",
      title: "Real work. Real results.",
      sub: "Not demos — live websites and ads running for real businesses.",
      items: [
        {
          name: "Coupé Barber",
          type: "Barbershop · Budapest",
          chip: "Fresha booking integrated",
          desc: "Premium barbershop on Ferenc körút. Real pricing and online booking.",
        },
        {
          name: "Atelier V",
          type: "Premium yoga studio · Budapest",
          chip: "Private booking system",
          desc: "Exclusive 1:1 somatic yoga for leaders in a discreet city residence.",
        },
        {
          name: "Kirembe Adventures",
          type: "Kitesurfing · Zanzibar",
          chip: "Real video ad",
          desc: "Kitesurf lessons and guiding on Zanzibar's east coast. Video ad running live.",
        },
        {
          name: "Pai Striking Academy",
          type: "Box / Kickbox gym · Phnom Penh",
          chip: "Own product",
          desc: "Boxing, kickbox and MMA gym. Trial booking and program library.",
        },
      ],
      videoLabel: "Kirembe · video ad",
      visit: "See it live",
      live: "Live site",
      desktopView: "Desktop",
      phoneView: "Phone",
    },
    how: {
      tag: "PROCESS // 3 QUESTIONS",
      title: "You answer three questions. We handle the rest.",
      steps: [
        { n: "01", t: "Business and location", d: "What you do and where. That's enough to base the site and ads on." },
        { n: "02", t: "Biggest marketing pain", d: "What hurts most? No website? Can't be found? Slow bookings?" },
        { n: "03", t: "Best way to reach you", d: "How do we reach you fastest? Phone, email or message." },
      ],
      rest: "Then we build the website, the ads and the content — you just approve.",
    },
    benefits: {
      tag: "BENEFITS // WHY US",
      title: "Why this works for small businesses",
      items: [
        { t: "Fast start", d: "Days instead of weeks. AI cuts production time." },
        { t: "Human-checked AI", d: "The machine works, but a human reviews and approves every result." },
        { t: "No long-term contract", d: "Cancel the monthly plan anytime. No trap." },
        { t: "Transparent pricing", d: "Fixed prices, no hidden cost anywhere." },
        { t: "Local Hungarian team", d: "We understand the Hungarian market and local search." },
        { t: "Found where people search", d: "Google search optimization for local shops." },
      ],
      mapTitle: "Found where people search",
      mapQuery: "Bakery near me",
    },
    trust: {
      tag: "TRUST // HONEST CLAIMS",
      title: "We only promise what's true.",
      items: [
        { t: "GDPR-aware sourcing", d: "Content and data sources handled per EU privacy principles." },
        { t: "Human approval", d: "Nothing goes out without a human checking it first." },
        { t: "Real live work", d: "Every portfolio item is a live website — open it and see for yourself." },
      ],
    },
    testimonials: {
      tag: "TESTIMONIALS // CLIENTS",
      title: "What they say about us",
      items: [
        { q: "The site was ready in a week, and the bookings are already coming. I didn't think it could be this simple.", a: "— Budapest nail salon" },
        { q: "They wrote the ads, I just approved. The cost paid for itself in the first month.", a: "— City bakery" },
        { q: "Finally marketing I understand and that works. Transparent price, no surprises.", a: "— Barbershop" },
      ],
    },
    pricing: {
      tag: "PRICING // MONTHLY PLANS",
      title: "Fixed monthly prices. Cancel anytime.",
      sub: "After the launch package you pick a monthly tier. No commitment.",
      tiers: [
        {
          name: "Basic",
          price: "54,000",
          period: "Ft / mo",
          desc: "Website maintenance and basic content.",
          features: ["Website maintenance", "4 posts / month", "Basic ad management", "Email support"],
          popular: false,
        },
        {
          name: "Standard",
          price: "79,000",
          period: "Ft / mo",
          desc: "The best choice for most small businesses.",
          features: ["Everything in Basic", "8 posts / month", "Ad optimization", "Monthly performance report", "Phone support"],
          popular: true,
        },
        {
          name: "Pro",
          price: "89,000",
          period: "Ft / mo",
          desc: "Maximum visibility and active management.",
          features: ["Everything in Standard", "12 posts / month", "Campaign management & A/B testing", "Priority support", "Monthly consultation"],
          popular: false,
        },
      ],
      cta: "I choose this",
    },
    faq: {
      tag: "FAQ // FREQUENT QUESTIONS",
      title: "Before you leap",
      items: [
        { q: "Why is the launch package so cheap?", a: "Because AI speeds production, and the first 50 clients get portfolio pricing. Work takes days instead of weeks, so cost is lower — we pass that back to you." },
        { q: "How long until my website is ready?", a: "As part of the launch package, usually 5–7 working days once we have the answers to the three questions." },
        { q: "What does it cost after launch?", a: "Per your monthly plan: Basic 54,000, Standard 79,000 or Pro 89,000 Ft. The launch package is a one-time 89,000 Ft (first 50 clients)." },
        { q: "Can I cancel anytime?", a: "Yes. The monthly plan cancels anytime — no long-term contract, no commitment." },
      ],
    },
    lead: {
      title: "Start Your Leap",
      sub: "Three questions — then we handle the rest.",
      q1: "What do you do and where?",
      q1p: "e.g. nail salon, Budapest district XIII",
      q2: "What's your biggest marketing pain?",
      q2p: "e.g. no website / can't be found / too few bookings",
      q3: "How can we reach you fastest?",
      q3p: "e.g. email, phone, WhatsApp",
      name: "Your name",
      nameP: "Anna Kovács",
      submit: "Send my application",
      sending: "Sending...",
      success: "You're one step closer to your digital leap — we'll be in touch soon.",
      error: "Couldn't send it. Email us directly:",
      back: "Back",
      close: "Close",
    },
    footer: {
      tag: "DIGITAL LEAP // CONTACT",
      mission: "Digitális Ugrás builds the digital leap for Hungarian small businesses — fast, honest, human.",
      email: "digitalisugras@gmail.com",
      rights: "© 2026 Digitális Ugrás. All rights reserved.",
      links: [
        { l: "Work", h: "#work" },
        { l: "Process", h: "#how" },
        { l: "Pricing", h: "#pricing" },
        { l: "FAQ", h: "#faq" },
      ],
    },
  },
};

const I18nContext = createContext({ lang: "hu", t: translations.hu, setLang: () => {} });

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState("hu");
  const setLang = useCallback((l) => setLangState(l), []);
  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

