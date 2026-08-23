/**
 * Centralized content + business configuration for the F1 2026 landing page.
 *
 * Every fact the page publishes lives here so event dates, access windows,
 * pricing posture, inventory and claims can be updated in one place.
 *
 * VERIFICATION MODEL
 * - Fields marked `verified: true` come from official COTA 2026 pages or the
 *   business itself (see docs/Triple_W_F1_Landing_Page_Audit_2026.pdf, §4).
 * - Fields marked `verified: false` MUST be confirmed by Triple W before the
 *   page leans on them harder (see LAUNCH_CHECKLIST at the bottom).
 * - Nothing in this file may be invented. If data is missing, the page shows
 *   the honest fallback (e.g. custom quote instead of a price).
 */

export const BUSINESS = {
  name: "Triple W Rentals",
  base: "Tyler, Texas",
  ownerLine: "Owned and operated by Weston and the Triple W team",
  phoneDisplay: "(972) 965-6901",
  phoneHref: "tel:+19729656901",
  smsHref: "sms:+19729656901",
  email: "triplewrentals@gmail.com",
  mainSiteUrl: "https://triple-w-rentals.vercel.app",
  /** Confirm before launch that this is still the right response promise. */
  responsePromise: "We reply within two hours during business hours, or first thing the next morning.",
} as const;

export const EVENT = {
  /** Descriptive use only - no F1/COTA logos or official styling anywhere. */
  name: "Formula 1 United States Grand Prix",
  venue: "Circuit of The Americas",
  city: "Austin, Texas",
  raceDaysLabel: "October 23-25, 2026",
  stayWindowLabel: "October 22-26, 2026",
  kickerLabel: "Austin Race Weekend | Oct 22-26, 2026",
  stayStartIso: "2026-10-22",
  stayEndIso: "2026-10-26",
} as const;

/**
 * Campsite facts from official COTA 2026 camping/ticket pages, accessed
 * August 22, 2026 (audit §4). Rules and availability can change - the page
 * always tells visitors to verify current rules directly with COTA.
 */
export const COTA_CAMPING = {
  officialUrl: "https://circuitoftheamericas.com/ticket/f1-rv-camping/",
  premium: {
    label: "Premium RV",
    siteSize: "Approx. 50 x 24 ft",
    surface: "Paved",
    hookups: "Water and electric hookups",
    assignment: "Reserved sites",
    accessWindow: "Thu, Oct 22 at noon through Mon, Oct 26 at noon",
    /** On the official page as of Aug 22, 2026. */
    availabilityNote: "Listed as sold out on COTA's official page as of Aug 22, 2026",
  },
  lotN: {
    label: "Lot N",
    siteSize: "Approx. 40 x 24 ft",
    surface: "Grass / gravel",
    hookups: "No hookups (dry camping)",
    assignment: "First come, first served",
    accessWindow: "Thu, Oct 22 at 7 AM through Mon, Oct 26 at noon",
    services:
      "COTA lists paid showers, mobile freshwater fills and pump-out service for an additional charge",
  },
} as const;

/**
 * Pricing posture. The audit forbids publishing "$200/night" style anchors
 * unless a validated all-in event price exists. Until Triple W validates one,
 * the page sells a custom race-weekend quote with a transparent line-item list.
 */
export const PRICING = {
  mode: "custom-quote" as "custom-quote" | "validated-starting-price",
  /** Only used when mode === "validated-starting-price". Keep null until verified. */
  validatedStartingPrice: null as string | null,
  quoteLineItems: [
    "RV rental for your exact dates",
    "Delivery, placement and leveling",
    "Setup and end-of-weekend pickup",
    "Generator and fuel plan, if your site has no hookups",
    "Taxes, fees and refundable deposit",
    "Any add-ons you choose",
  ],
  separatePurchases: [
    "Your COTA campsite or campground reservation",
    "Race tickets (every guest needs valid circuit admission)",
    "COTA's paid on-site services (showers, freshwater fills, pump-outs in Lot N)",
  ],
} as const;

/**
 * Trust stats. Sourced from the business / its Google profile during the
 * April 2026 optimization pass. Re-confirm current numbers before launch.
 */
export const TRUST_STATS = {
  verified: false, // re-confirm the exact figures before paid traffic
  items: [
    { value: "4.7", suffix: "★", label: "Google rating" },
    { value: "200+", suffix: "", label: "Deliveries across Texas" },
    { value: "Owner", suffix: "", label: "Operated, not a marketplace" },
    { value: "Tyler, TX", suffix: "", label: "Based and insured" },
  ],
} as const;

/** Real Google review excerpts collected from the Triple W profile (Apr 2026). */
export const REVIEWS: ReadonlyArray<{ text: string; name: string }> = [
  {
    text: "The customer service was outstanding. Shane went above and beyond. The camper was delivered and set up before I even arrived, completely stocked. All I had to do was bring my family and food.",
    name: "Amy Walker",
  },
  {
    text: "Have rented from this company many times. They have excellent customer service and the RV has always been in great shape. What stands out about this company is the convenience. They will deliver a golf cart and RV to wherever you're at and you don't have to touch a thing.",
    name: "Daniel Henson",
  },
  {
    text: "The RV was set up and delivered for us. Clean and roomy. Westin and his company were a pleasure to do business with. Couldn't ask for a better experience!",
    name: "Grant Walker",
  },
  {
    text: "Triple W was great to work with. As an RV novice, Wayne was very polite, patient and accommodating. The RV was in great condition and fully loaded with strong A/C. Will definitely use them again.",
    name: "Sandy McKinney",
  },
  {
    text: "This was the easiest rental I have ever done. These guys were quick to answer any questions, very professional, and so convenient for our weekend at the ATV park. The unit was super clean and perfect size for the family. Definitely recommend!!",
    name: "Jennifer Crumley",
  },
  {
    text: "We've used Triple W Rentals twice now. And we can't be more pleased! Their trailers are exceptionally clean and exactly as they are described on their website. Triple W goes out of their way to give you the best experience.",
    name: "Mylissa Messer",
  },
];

/** Real Triple W unit photography (Wix CDN, same assets as the main site). */
export const GALLERY_IMAGES: ReadonlyArray<string> = [
  "https://static.wixstatic.com/media/62f926_c393c781146e46d6938c11efb3f377d6~mv2.webp",
  "https://static.wixstatic.com/media/62f926_72984415dae543f5a93113defc3976a4~mv2.webp",
  "https://static.wixstatic.com/media/62f926_6081972934c541bf9b8aaa703b74f585~mv2.webp",
  "https://static.wixstatic.com/media/62f926_69694ee7940c4fe4985b984e4067343e~mv2.webp",
  "https://static.wixstatic.com/media/62f926_26b6714d0a0d4937b73e45668ce44bd9~mv2.webp",
  "https://static.wixstatic.com/media/62f926_d5db0126f18a4cc0884f4308913f9362~mv2.webp",
  "https://static.wixstatic.com/media/62f926_e4c918f468b243d89371fa40f6424fce~mv2.webp",
  "https://static.wixstatic.com/media/62f926_b833defbf81b455991760bc1f4c878ff~mv2.webp",
  "https://static.wixstatic.com/media/62f926_1ba23ff81e904ae2b5feae14ed4754fb~mv2.webp",
  "https://static.wixstatic.com/media/62f926_cf6fafa3b7184f93b149c98ee96c783f~mv2.webp",
];

export const HERO_IMAGE =
  "https://static.wixstatic.com/media/62f926_c393c781146e46d6938c11efb3f377d6~mv2.webp";

export const LOGO_IMAGE =
  "https://static.wixstatic.com/media/62f926_cdac06309eba45679ea0ac08a402b45c~mv2.png";

/**
 * Exact unit cards. The audit requires exact name, real photos, length,
 * slide-outs, bed map, realistic adult capacity, power compatibility and
 * availability status for every advertised unit - and only units that are
 * compatible and bookable for the 2026 race weekend.
 *
 * Populate this array ONLY with business-verified 2026 inventory. While it is
 * empty, the page shows the honest fleet section (real photos + matching
 * process) instead of specific unit cards.
 */
export type UnitCard = {
  id: string;
  name: string;
  exteriorImage: string;
  interiorImages: string[];
  lengthFt: number;
  slideOuts: string;
  permanentBeds: string;
  convertibleBeds: string;
  realisticAdultCapacity: number;
  bestFor: string;
  bathroom: string;
  kitchen: string;
  power: string;
  included: string[];
  priceContext: string;
  availability: "available" | "on-hold" | "booked";
};

export const UNITS: ReadonlyArray<UnitCard> = [
  // Intentionally empty until Triple W verifies 2026 race-weekend inventory.
];

/** RV categories Triple W actually rents (used for the honest fleet explainer). */
export const FLEET_CATEGORIES = [
  {
    name: "Travel Trailers",
    fitNote: "Shorter overall length, the usual match for Lot N's roughly 40 x 24 ft sites.",
  },
  {
    name: "Fifth Wheels",
    fitNote: "More interior room and separate sleeping areas for larger crews, where site length allows.",
  },
  {
    name: "Class A Motorhomes",
    fitNote: "The most living space. Site length, surface and slide clearance decide where they can go.",
  },
] as const;

/** What every race-weekend rental includes. Keep honest - no invented $ values. */
export const INCLUSIONS: ReadonlyArray<string> = [
  "Delivery to your verified site and precise placement",
  "Leveling, stabilizing and slide-out deployment",
  "Hookup to your site's utilities where they exist, or a generator plan where they don't",
  "A walkthrough of every system when you arrive",
  "A direct line to the team through race weekend",
  "Pickup and cleanup after you head home",
];

export const FAQ_CORE: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Do I need a COTA campsite before I reserve the RV?",
    a: "Yes. The RV rental does not include a legal place to park it overnight. You need an approved RV campsite (a COTA Premium RV site, a Lot N spot, or a site at another campground) before delivery can be confirmed. Don't have one yet? Send the form anyway and we'll point you at your realistic options before you spend anything.",
  },
  {
    q: "Can Triple W deliver, set up and collect the RV at my exact lot?",
    a: "That's the plan, and it's confirmed, not assumed. Before we take any deposit we verify your exact lot, your campsite pass, the unit's fit, the access windows and COTA's current vendor rules. Your written confirmation then states the setup window, the pickup window and whether you need to meet the driver.",
  },
  {
    q: "What will the complete weekend cost?",
    a: "You get one itemized race-weekend quote: RV rental, delivery, setup, pickup, taxes and fees, the generator and fuel plan if your site needs one, and the refundable deposit. Your COTA campsite and race tickets are separate purchases you make with COTA. No surprise line items after the fact.",
  },
  {
    q: "How will power and A/C work in Lot N without hookups?",
    a: "Lot N is dry camping with no electric or water hookups. Power comes from a generator sized to the unit, and we build the generator and fuel plan into your quote along with quiet-hour rules and safe-operation basics. We'll tell you exactly what the setup can and can't run before you commit.",
  },
  {
    q: "Will the RV fit my site and sleep our adults comfortably?",
    a: "COTA lists Premium RV sites at roughly 50 x 24 ft (paved, with hookups) and Lot N sites at roughly 40 x 24 ft (grass/gravel, no hookups). We match the exact unit length, slide clearance and service side to your site before reserving, and we walk you through the real bed layout, permanent beds versus convertibles, instead of quoting a manufacturer's maximum.",
  },
  {
    q: "Are the campsite and race tickets included?",
    a: "No. Unless your written quote explicitly says otherwise, the Triple W rental is the RV accommodation only. The COTA campsite is a separate reservation, and every guest needs valid race admission to enter the circuit.",
  },
  {
    q: "When will the RV be ready, and do I need to meet the driver?",
    a: "Per COTA's 2026 pages, Lot N opens Thursday, Oct 22 at 7 AM and Premium RV access starts Thursday at noon, with both running through Monday, Oct 26 at noon. Once your site and access are verified, your confirmation spells out the setup window, the driver contact and whether handoff is in person or self-check-in.",
  },
  {
    q: "How do water, showers, toilets and pump-outs work in Lot N?",
    a: "Your RV arrives with the freshwater and tank status listed in your agreement. Lot N has restroom and shower facilities, and COTA lists paid mobile freshwater fills and pump-out service. We size the plan to your group and explain who orders and pays for mid-weekend service. Check COTA's current camping page for their service pricing.",
  },
  {
    q: "What's included, and what should we bring?",
    a: "Delivery, placement, leveling, setup, a full walkthrough, and pickup afterward are standard. Your quote lists exactly what's stocked in your unit. Bring food, drinks, sunscreen, earplugs and personal items, and stock up before you enter, because race-weekend traffic makes errand runs slow.",
  },
  {
    q: "What happens if the A/C, generator, water or toilet fails?",
    a: "You get a direct support number for the team through the weekend. Most issues are resolved with a quick call; if it needs hands, we handle it on site. Your confirmation states the realistic response window and the fallback policy if an essential system can't be restored.",
  },
  {
    q: "Can we leave Lot N and come back for supplies?",
    a: "COTA controls vehicle access and re-entry, and campers report re-entry works with the correct permit, but traffic makes off-site errands slow. We send you the current official access and re-entry rules before arrival. Plan to arrive stocked.",
  },
  {
    q: "What are the deposit, cancellation and event-change terms?",
    a: "Everything is in writing before you pay anything: the reservation deposit, the damage deposit, payment dates, the cancellation schedule and how refunds are issued. Triple W's terms are stated separately from decisions COTA or the event organizer might make about the event itself.",
  },
];

export const FAQ_SECONDARY: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "How far is the campsite from the track gates and concerts?",
    a: "Both COTA RV areas are on circuit property, but the walk depends on your exact lot and gate. We'll help you plan the route once your site is confirmed. For outside campgrounds, we'll be straight with you about the commute.",
  },
  {
    q: "Can our group park multiple RVs together?",
    a: "Premium RV sites are reserved; Lot N is first come, first served, so grouping there depends on arrival timing. Tell us in the form if you're coordinating multiple units and we'll plan it together.",
  },
  {
    q: "How loud, hot, dusty or uneven should we expect the lot to be?",
    a: "It's a race weekend on a working circuit: expect engine noise during sessions, warm afternoons, and grass-and-gravel ground in Lot N. That's exactly why the unit is leveled and the A/C plan is confirmed before you arrive.",
  },
  {
    q: "What are the quiet hours and generator safety rules?",
    a: "COTA sets quiet hours and generator rules for each event, and they control. We brief you on the current rules and carbon-monoxide basics during your walkthrough.",
  },
  {
    q: "Are pets, propane grills, golf carts or extra vehicles allowed?",
    a: "COTA's current event rules decide, and policies vary by area and year. Ask us in the form and we'll confirm against the current official guidance before you book anything extra.",
  },
  {
    q: "Is cell service reliable out there?",
    a: "With 100,000+ people on site, networks slow down at peak times. We exchange every critical detail (site, windows, contacts) in writing before the weekend so nothing depends on a signal bar.",
  },
  {
    q: "What about ADA sites and accessible RVs?",
    a: "ADA campsite requests go through COTA. Tell us your access needs in the form and we'll flag which of our units work best and coordinate the details with you directly.",
  },
];

export const DISCLAIMER =
  "Triple W Rentals is an independent RV rental company based in Tyler, Texas. We are not affiliated with, endorsed by, or sponsored by Formula 1, the United States Grand Prix, Circuit of The Americas, or any racing team. Event names are used only to identify the event. Campsites and race tickets are sold separately by their official vendors. Delivery is confirmed only after site, unit and venue-access verification.";

/**
 * BUSINESS INFORMATION REQUIRED BEFORE LAUNCH
 * Rendered nowhere - this is the single source of truth for what Triple W
 * must confirm before scaling paid traffic (audit §4, §15).
 */
export const LAUNCH_CHECKLIST: ReadonlyArray<string> = [
  "Verified 2026 race-weekend inventory: which exact units are available Oct 22-26 (populate UNITS in content/site.ts)",
  "Exact specs per unit: length, slides, permanent vs convertible beds, realistic adult capacity, bathroom/kitchen, generator compatibility",
  "Validated all-in weekend pricing (switch PRICING.mode to 'validated-starting-price') or confirm custom-quote posture",
  "Written confirmation of COTA vendor/commercial delivery access for race weekend, plus delivery and pickup windows",
  "Generator capacity and included fuel allowance per unit; water and waste service responsibilities",
  "Support coverage during the event (staffed hours, response target). The page currently promises a direct line, not 24/7",
  "Response-time promise for inquiries (page currently says two hours during business hours)",
  "Deposit, cancellation and event-change terms in writing",
  "Re-confirm Google rating and delivery count (TRUST_STATS), and permission to quote the named reviews",
  "Confirm (972) 965-6901 is the current business line and triplewrentals@gmail.com is monitored",
  "Google Ads conversion labels for phone click and form submit (see lib/analytics.ts TODOs)",
  "Resend: verify triplewrentals.com sending domain and rotate the API key",
];
