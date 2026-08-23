/**
 * Centralized content + business configuration for the COTA 2026 landing page.
 *
 * Every fact the page publishes lives here so event dates, offer copy,
 * inventory and claims can be updated in one place.
 *
 * VERIFICATION MODEL (UI brief §4, §12)
 * - Copy marked "approved" comes from the Aug 23, 2026 execution brief.
 * - Unit data marked "published" comes from Triple W's own sites
 *   (triplewrentals.com, triple-w-rentals.vercel.app).
 * - Anything missing is a clearly named TODO with neutral copy. Nothing in
 *   this file may be invented.
 */

export const BUSINESS = {
  name: "Triple W Rentals",
  base: "Tyler, Texas",
  phoneDisplay: "(972) 965-6901",
  phoneHref: "tel:+19729656901",
  smsHref: "sms:+19729656901",
  email: "triplewrentals@gmail.com",
  mainSiteUrl: "https://triple-w-rentals.vercel.app",
  /** TODO(business): confirm the team can consistently meet this target. */
  responsePromise:
    "We usually reply within two hours during business hours, or first thing the next morning.",
} as const;

export const EVENT = {
  /** Descriptive use only. No F1/COTA logos or official styling anywhere. */
  name: "United States Grand Prix",
  venue: "Circuit of The Americas",
  venueShort: "COTA",
  city: "Austin, Texas",
  raceDaysLabel: "October 23-25, 2026",
  stayWindowLabel: "October 22-26, 2026",
  /** Thin event bar above the navigation (brief §7.1). */
  eventBarParts: ["COTA", "Austin, Texas", "United States Grand Prix", "October 23-25, 2026"],
  kickerParts: ["COTA Race Weekend", "RV Stay Oct 22-26, 2026"],
  stayStartIso: "2026-10-22",
  stayEndIso: "2026-10-26",
  /** Arrival is flexible; Thursday is only the first setup day, not a requirement. */
  arrivalNote:
    "Arrive Thursday, Friday or whenever your weekend starts. Setup is done before you get there.",
} as const;

/** Hero copy (approved, brief §7.2). */
export const HERO = {
  h1: "Your own RV at COTA. Set up before you arrive.",
  sub: "Tell us your group size. We handle the rest: campsite, delivery, setup, pickup.",
  primaryCta: "Get My Weekend Quote",
  secondaryCta: "Call (972) 965-6901",
  secondaryCtaSms: "Text Us",
  microcopy: "No obligation. Race tickets sold separately. Availability is confirmed before payment.",
  packageTitle: "Your race-weekend package",
  packageItems: [
    "Your campsite, coordinated for you",
    "RV matched to your group",
    "Delivery and complete setup",
    "Cold A/C and real sleeping space",
    "Pickup after the weekend",
  ],
} as const;

/** Trust strip (approved, brief §7.3). */
export const TRUST_STRIP = [
  "Delivered & Set Up",
  "Real Units, Real Photos",
  "Group-Friendly Floorplans",
  "Race-Weekend Support",
] as const;

/**
 * Campsite coordination (approved neutral language, brief §4 + §7.4).
 * TODO(business): exact partner campsite, lot type, utilities, distance and
 * whether campsite fees are inside the Triple W quote are NOT confirmed.
 * Keep this copy neutral until they are.
 */
export const CAMPSITE = {
  eyebrow: "The campsite",
  headline: "Your spot is already handled.",
  body: "Through our race-weekend partner, Triple W coordinates your campsite and RV together. Tell us your group size and we'll confirm availability, match the right RV, deliver and complete the setup, then collect everything after the weekend.",
  proof: ["No campground search", "No towing", "No setup guesswork"],
  cta: "Get My Weekend Quote",
  disclosure:
    "Race tickets are sold separately. RV and campsite availability is confirmed before payment.",
} as const;

/** Why not a hotel (brief §7.5): two lines each. */
export const PAIN_POINTS = [
  {
    title: "Hotels scatter the group.",
    desc: "Race-weekend blocks split your crew across rooms, floors and properties.",
  },
  {
    title: "The commute eats the weekend.",
    desc: "More than 100,000 fans move in and out of the circuit each day. Distance costs you prime hours.",
  },
  {
    title: "Towing and setup become a second job.",
    desc: "Getting an unfamiliar trailer leveled and powered on the first try is not how a race weekend should start.",
  },
  {
    title: "Power, water and waste should not be guesswork.",
    desc: "A warm October afternoon gets long fast without a real generator, water and waste plan.",
  },
] as const;

/**
 * The fleet as Triple W publishes it (14 units, triple-w-rentals.vercel.app,
 * Aug 2026), shown as a category mix only. Unit names are intentionally not
 * displayed on the page; the exact unit is confirmed in the written quote.
 */
export const FLEET_FIT: ReadonlyArray<string> = [
  "For premium groups",
  "For families",
  "For couples & solo",
];

/**
 * Real Triple W unit photography for the rotating carousel. Captions only
 * state what is visible; no model names.
 */
export const GALLERY: ReadonlyArray<{ src: string; alt: string; caption: string }> = [
  {
    src: "https://static.wixstatic.com/media/62f926_6081972934c541bf9b8aaa703b74f585~mv2.webp",
    alt: "Triple W toy hauler parked at a campsite",
    caption: "Toy hauler, delivered and set up",
  },
  {
    src: "https://static.wixstatic.com/media/62f926_69694ee7940c4fe4985b984e4067343e~mv2.webp",
    alt: "RV living area with a sofa, dinette and large windows",
    caption: "Living area",
  },
  {
    src: "https://static.wixstatic.com/media/62f926_72984415dae543f5a93113defc3976a4~mv2.webp",
    alt: "RV bedroom with a made king-size bed",
    caption: "Private bedroom",
  },
  {
    src: "https://static.wixstatic.com/media/62f926_c393c781146e46d6938c11efb3f377d6~mv2.webp",
    alt: "RV kitchen with an island, full-size refrigerator and range",
    caption: "Kitchen with island",
  },
  {
    src: "https://static.wixstatic.com/media/62f926_d5db0126f18a4cc0884f4308913f9362~mv2.webp",
    alt: "RV bathroom with a walk-in shower and vanity",
    caption: "Full bathroom with shower",
  },
  {
    src: "https://static.wixstatic.com/media/62f926_b833defbf81b455991760bc1f4c878ff~mv2.webp",
    alt: "RV lounge with a fireplace, TV and sofa",
    caption: "Lounge with fireplace",
  },
  {
    src: "https://static.wixstatic.com/media/62f926_cf6fafa3b7184f93b149c98ee96c783f~mv2.webp",
    alt: "Toy hauler garage area set up with bunk beds",
    caption: "Bunk area for extra sleepers",
  },
  {
    src: "https://static.wixstatic.com/media/62f926_1ba23ff81e904ae2b5feae14ed4754fb~mv2.webp",
    alt: "Triple W fifth wheel parked at a campsite",
    caption: "Fifth wheel exterior",
  },
  {
    src: "https://static.wixstatic.com/media/62f926_26b6714d0a0d4937b73e45668ce44bd9~mv2.webp",
    alt: "Toy hauler patio deck with railing",
    caption: "Patio deck",
  },
];

/**
 * Optional add-ons offered in the form. Paid; pricing is quoted, never shown
 * on the page. TODO(business): confirm Starlink availability per unit.
 */
export const ADD_ONS: ReadonlyArray<{ value: string; label: string; note: string }> = [
  {
    value: "wifi-starlink",
    label: "Wi-Fi (Starlink)",
    note: "Paid add-on. Price confirmed in your quote.",
  },
];

export const HERO_IMAGE =
  "https://static.wixstatic.com/media/62f926_c393c781146e46d6938c11efb3f377d6~mv2.webp";

export const LOGO_IMAGE =
  "https://static.wixstatic.com/media/62f926_cdac06309eba45679ea0ac08a402b45c~mv2.png";

/** How it works (approved, brief §7.7): three steps. */
export const STEPS = [
  {
    title: "Tell us your group",
    desc: "Dates, group size, how many actually need a bed, and preferences.",
  },
  {
    title: "We confirm the plan",
    desc: "RV availability, your campsite, confirmation that we can get the rig on your site, and an itemized quote before payment.",
  },
  {
    title: "Arrive to a ready basecamp",
    desc: "Triple W delivers, sets up and later collects the RV.",
  },
] as const;

/** Weekend timeline (approved, brief §7.8). Verified event dates only. */
export const TIMELINE = [
  {
    day: "Thu",
    date: "22",
    label: "Setup window",
    desc: "Your campsite and RV setup are handled in the confirmed window, ready whether you arrive Thursday, Friday or later.",
  },
  {
    day: "Fri",
    date: "23",
    label: "Weekend begins",
    desc: "Your crew's escape from the heat, the crowds and the shuttle line.",
  },
  {
    day: "Sat",
    date: "24",
    label: "Full COTA day",
    desc: "Stay close to the action without reorganizing hotels, rides or meals.",
  },
  {
    day: "Sun",
    date: "25",
    label: "Grand Prix Sunday",
    desc: "Enjoy race day, then return to the same private basecamp.",
  },
  {
    day: "Mon",
    date: "26",
    label: "Pickup",
    desc: "Guests leave with their belongings. Triple W coordinates collection.",
  },
] as const;

/** What is included (approved, brief §7.9). The price you see is the price. */
export const QUOTE = {
  confirms: [
    "RV rental for your dates",
    "Delivery and complete setup",
    "Pickup after the weekend",
    "Power plan where applicable",
    "Taxes and fees",
    "Deposit, with the refund schedule in writing",
    "Your confirmed campsite arrangement",
    "Optional add-ons you choose, such as Wi-Fi (Starlink)",
  ],
  alwaysSeparate: [
    "Race admission (every guest needs valid circuit admission)",
    "Your travel to Austin",
    "Food and drinks",
    "Any campsite amenity or fee not explicitly included in the written quote",
  ],
} as const;

/**
 * Published on triplewrentals.com (refund & cancellation policy).
 * TODO(business): confirm the deposit amount and any event-specific terms.
 */
export const CANCELLATION_POLICY = {
  rules: [
    "More than 30 days before your booking: full refund",
    "30 to 8 days before: 50% refund",
    "7 days or fewer: no refund",
  ],
  note: "Your written quote states the exact deposit amount, payment dates and any event-specific terms before you pay anything.",
} as const;

/**
 * Trust stats. TODO(business): re-confirm the current Google rating, review
 * count and delivery count before paid traffic (brief §7.10).
 */
export const TRUST_STATS = [
  { value: "4.7", suffix: "★", label: "Google rating" },
  { value: "200+", suffix: "", label: "Deliveries across Texas" },
  { value: "14", suffix: "", label: "Units owned and maintained" },
  { value: "Tyler, TX", suffix: "", label: "Owner-operated" },
] as const;

/** Real Google review excerpts collected from the Triple W profile (Apr 2026). */
export const REVIEWS: ReadonlyArray<{ text: string; name: string }> = [
  {
    text: "The camper was delivered and set up before I even arrived, completely stocked. All I had to do was bring my family and food. The customer service was outstanding.",
    name: "Amy Walker",
  },
  {
    text: "The RV was set up and delivered for us. Clean and roomy. Westin and his company were a pleasure to do business with. Couldn't ask for a better experience!",
    name: "Grant Walker",
  },
  {
    text: "As an RV novice, Wayne was very polite, patient and accommodating. The RV was in great condition and fully loaded with strong A/C. Will definitely use them again.",
    name: "Sandy McKinney",
  },
  {
    text: "This was the easiest rental I have ever done. Quick to answer any questions, very professional, and so convenient. The unit was super clean and perfect size for the family.",
    name: "Jennifer Crumley",
  },
  {
    text: "We've used Triple W Rentals twice now. Their trailers are exceptionally clean and exactly as they are described on their website. Triple W goes out of their way to give you the best experience.",
    name: "Mylissa Messer",
  },
  {
    text: "Have rented from this company many times. Excellent customer service and the RV has always been in great shape. They deliver the RV to wherever you're at and you don't have to touch a thing.",
    name: "Daniel Henson",
  },
];

/** Decisive FAQ (brief §7.11): eight questions, neutral campsite language. */
export const FAQ_CORE: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Is the campsite already coordinated?",
    a: "Yes. Through our race-weekend partner, Triple W coordinates your campsite together with the RV, so there is no campground search on your side. The campsite and the RV are confirmed in writing before you pay anything.",
  },
  {
    q: "What exactly is included in my quote?",
    a: "One itemized quote: the RV rental for your dates, delivery and complete setup, pickup, the power plan where applicable, taxes and fees, the deposit with its refund schedule, the confirmed campsite arrangement and any optional services you choose. Race admission, your travel and food are always separate.",
  },
  {
    q: "How many adults can the RV sleep comfortably?",
    a: "We match the unit to how many people actually need a bed, not to a manufacturer's maximum. Tell us how many adults and kids are coming and how many real beds you want; your quote names the exact unit and its permanent sleeping arrangement.",
  },
  {
    q: "How do power, A/C, water and waste work?",
    a: "It depends on your confirmed campsite. Where utilities exist we connect to them; where they don't, a generator and fuel plan sized to the unit is part of the quote, along with fresh water and waste capacity planned for your group. We tell you exactly what the setup can run before you commit.",
  },
  {
    q: "When will the RV be delivered and ready?",
    a: "Before you arrive. Setup is coordinated in the confirmed window starting Thursday, Oct 22, so the RV is ready whether you come Thursday, Friday or later. Pickup is Monday, Oct 26. Your written confirmation states the setup window, the driver contact and whether handoff is in person or self-check-in.",
  },
  {
    q: "Are race tickets included?",
    a: "No. Race admission is sold separately by the official vendor, and every guest needs valid circuit admission. Triple W provides the RV, delivery, setup, pickup and the coordinated campsite.",
  },
  {
    q: "What happens if something stops working?",
    a: "You get a direct number for the team through the weekend. Most issues are resolved with a quick call; if it needs hands, we handle it on site. Your confirmation states the realistic response window and the fallback policy if an essential system can't be restored.",
  },
  {
    q: "What are the deposit and cancellation terms?",
    a: `Triple W's published policy: ${CANCELLATION_POLICY.rules
      .map((r) => r.charAt(0).toLowerCase() + r.slice(1))
      .join("; ")}. ${CANCELLATION_POLICY.note}`,
  },
];

/** Expanded list, behind "View all questions". */
export const FAQ_MORE: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "What should we bring?",
    a: "Your quote lists exactly what's stocked in your unit. Bring food, drinks, sunscreen, earplugs and personal items, and stock up before you arrive, because race-weekend traffic makes errand runs slow.",
  },
  {
    q: "Can our group book more than one RV?",
    a: "Yes. Tell us in the form if you're coordinating multiple units and we'll plan the placement together.",
  },
  {
    q: "How loud, hot or dusty should we expect it to be?",
    a: "It's a race weekend on a working circuit: expect engine noise during sessions and warm afternoons. That's exactly why the unit is leveled and the A/C plan is confirmed before you arrive.",
  },
  {
    q: "Are pets, grills or extra vehicles allowed?",
    a: "Venue and campsite rules decide, and they vary by area and year. Ask us in the form and we'll confirm against the current rules before you plan anything extra.",
  },
  {
    q: "Is cell service reliable out there?",
    a: "With 100,000+ people on site, networks slow down at peak times. We exchange every critical detail (placement, windows, contacts) in writing before the weekend so nothing depends on a signal bar.",
  },
  {
    q: "What about accessibility needs?",
    a: "Tell us your access needs in the form and we'll flag which of our units work best and coordinate the placement details with you directly.",
  },
];

export const DISCLAIMER =
  "Triple W Rentals is an independent RV rental company based in Tyler, Texas. We are not affiliated with, endorsed by, or sponsored by Formula 1, the United States Grand Prix, Circuit of The Americas, or any racing team. Event names are used only to identify the event. Race tickets are sold separately by the official vendor. Your campsite is coordinated through Triple W's race-weekend partner and confirmed in writing, together with the RV, before any payment.";

/**
 * BUSINESS FACTS STILL REQUIRING CONFIRMATION (brief §12). Rendered nowhere.
 */
export const LAUNCH_CHECKLIST: ReadonlyArray<string> = [
  "Exact partner campsite location or lot type",
  "Whether campsite fees are included in the Triple W quote or billed separately",
  "Utilities and services available at the partner campsites (drives the power/water/waste FAQ answer)",
  "Current Google rating, review count and the 200+ deliveries claim; link to the source review profile",
  "Response-time promise and weekend support availability",
  "Deposit amount, cancellation and event-change terms for race weekend",
  "Wi-Fi (Starlink) add-on: price and which units it is available on",
  "Google Ads conversion labels for phone click and form submit (see lib/analytics.ts TODOs)",
];
