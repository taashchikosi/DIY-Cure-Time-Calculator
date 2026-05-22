/**
 * Seed script — inserts only products with every required field explicitly
 * confirmed from the manufacturer's official TDS document.
 *
 * verified_by_human is FALSE on all rows. The site owner must manually
 * cross-check each row against its TDS PDF before setting it to TRUE.
 *
 * Run: pnpm seed
 */

import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const products: Prisma.ProductCreateInput[] = [
  // ─── DAP Dynaflex 230 ─────────────────────────────────────────────────────
  // TDS: DAP Dynaflex 230 Premium Interior/Exterior Sealant
  // Source: manufacturer TDS confirmed from uploaded PDF
  {
    manufacturer: "DAP",
    product_name: "Dynaflex 230 Premium Sealant",
    category: "sealant",
    sub_category: "acrylic_latex",
    slug: "dap-dynaflex-230-premium-sealant",
    open_time_min: null,
    clamp_time_min: null,
    dry_to_touch_min: 15,
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(168), // 7 days
    humidity_behaviour: "negative",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 40,
    max_application_temp_f: 100,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.dap.com/media/4209/dynaflex-230-tds.pdf",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── GE Advanced Silicone 2 ───────────────────────────────────────────────
  // TDS: GE Advanced Silicone 2 Window & Door Sealant
  // Source: manufacturer TDS confirmed from uploaded PDF
  {
    manufacturer: "GE",
    product_name: "Advanced Silicone 2 Window & Door Sealant",
    category: "sealant",
    sub_category: "silicone",
    slug: "ge-advanced-silicone-2-window-door",
    open_time_min: 5,
    clamp_time_min: null,
    dry_to_touch_min: 30,
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(24),
    humidity_behaviour: "bell_curve",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 32,
    max_application_temp_f: 120,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: true,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.momentive.com/en-US/categories/sealants/ge-advanced-silicone2-window-door/",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── Loctite PL 375 ───────────────────────────────────────────────────────
  // TDS: Loctite PL 375 Heavy Duty Construction Adhesive
  // Source: manufacturer TDS confirmed from uploaded PDF
  // Note: PVA-based; mfft_celsius=4 derived from stated min application temp
  //       of 40°F (4.4°C), which is the definition of MFFT for PVA adhesives.
  {
    manufacturer: "Loctite",
    product_name: "PL 375 Heavy Duty Construction Adhesive",
    category: "adhesive",
    sub_category: "PVA_construction",
    slug: "loctite-pl-375-heavy-duty-construction-adhesive",
    open_time_min: 60,
    clamp_time_min: null,
    dry_to_touch_min: null,
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(48),
    humidity_behaviour: "negative",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 40,
    max_application_temp_f: 100,
    mfft_celsius: new Prisma.Decimal(4),
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/tds-loctite-pl-375.pdf",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── Loctite PL Premium ───────────────────────────────────────────────────
  // TDS: Loctite PL Premium Polyurethane Construction Adhesive
  // Source: manufacturer TDS confirmed from uploaded PDF
  {
    manufacturer: "Loctite",
    product_name: "PL Premium Polyurethane Construction Adhesive",
    category: "adhesive",
    sub_category: "polyurethane",
    slug: "loctite-pl-premium-polyurethane-construction-adhesive",
    open_time_min: 15,
    clamp_time_min: 1440, // 24 hours stated in TDS
    dry_to_touch_min: null,
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(48),
    humidity_behaviour: "positive",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 41,
    max_application_temp_f: 95,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/tds-loctite-pl-premium.pdf",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── Sakrete 5000 Plus ────────────────────────────────────────────────────
  // TDS: Sakrete 5000 Plus Concrete Mix
  // Source: manufacturer TDS confirmed from uploaded PDF
  // structural_liability=true: load-bearing concrete application
  {
    manufacturer: "Sakrete",
    product_name: "5000 Plus Concrete Mix",
    category: "concrete",
    sub_category: null,
    slug: "sakrete-5000-plus-concrete-mix",
    open_time_min: null,
    clamp_time_min: null,
    dry_to_touch_min: 1440, // walkable at 24 hours per TDS
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(672), // 28 days
    humidity_behaviour: "hydration",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 40,
    max_application_temp_f: 90,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: true,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.sakrete.com/products/concrete-repair-mortar/5000-plus-concrete-mix",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── Gorilla Glue Original ────────────────────────────────────────────────
  // TDS: Gorilla Glue Europe A/S Technical Data Sheet (rev. 2007-01-31)
  // Source: confirmed from uploaded PDF
  // Working temp. Wood 10–30°C (50–86°F) is the substrate/ambient range for
  // application — the explicit TDS field used as min/max application temp.
  // Full cure: "full bonding strength after 24 hours at 20°C" — explicit.
  {
    manufacturer: "Gorilla Glue",
    product_name: "Gorilla Glue Original Polyurethane Adhesive",
    category: "adhesive",
    sub_category: "polyurethane",
    slug: "gorilla-glue-original-polyurethane-adhesive",
    open_time_min: 10,
    clamp_time_min: 240, // 1–4 hours stated; conservative upper bound
    dry_to_touch_min: null,
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(24),
    humidity_behaviour: "positive",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 50, // 10°C working temp (wood)
    max_application_temp_f: 86, // 30°C working temp (wood)
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.gorillaglue.com/wp-content/uploads/2016/07/Gorilla-Glue-TDS.pdf",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── DAP All Purpose RTV 100% Silicone ───────────────────────────────────
  // TDS: DAP All Purpose RTV 100% Silicone (DAP Global Inc., dated 3/3/2019)
  // Source: confirmed from uploaded PDF
  {
    manufacturer: "DAP",
    product_name: "All Purpose RTV 100% Silicone Sealant",
    category: "sealant",
    sub_category: "silicone",
    slug: "dap-all-purpose-rtv-100-silicone-sealant",
    open_time_min: 10,       // Tooling time 5–10 min
    clamp_time_min: null,
    dry_to_touch_min: 20,    // Tack free 10–20 min
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(24),
    humidity_behaviour: "bell_curve",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: -4,  // Explicit Application Temperature Range
    max_application_temp_f: 120,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: true,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.dap.com/media/all-purpose-rtv-100-silicone-tds.pdf",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── Loctite Epoxy Quick Set ──────────────────────────────────────────────
  // TDS: Loctite Epoxy Quick Set (Henkel US TDS, rev. 08/30/2016)
  // Source: confirmed from uploaded PDF
  // Hardener explicitly contains "amine curing agents" → amine_blush_risk TRUE.
  {
    manufacturer: "Loctite",
    product_name: "Epoxy Quick Set",
    category: "adhesive",
    sub_category: "epoxy",
    slug: "loctite-epoxy-quick-set",
    open_time_min: 10,      // Gel time 4–10 min
    clamp_time_min: 10,     // "Support bond for 10 minutes at room temperature"
    dry_to_touch_min: null,
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(24), // Explicitly stated "Full Cure Time: 24 hours"
    humidity_behaviour: "neutral",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 39, // Explicit: "Apply between 39°F (4°C) and 95°F (35°C)"
    max_application_temp_f: 95,
    mfft_celsius: null,
    amine_blush_risk: true,
    dew_point_warning: true,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/tds-loctite-epoxy-quick-set.pdf",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── DAP Alex Plus Acrylic Latex Caulk Plus Silicone ─────────────────────
  // TDS: DAP Alex Plus Acrylic Latex Caulk Plus Silicone (DAP TDS, dated 5/12/25)
  // Source: confirmed from uploaded PDF
  {
    manufacturer: "DAP",
    product_name: "Alex Plus Acrylic Latex Caulk Plus Silicone",
    category: "sealant",
    sub_category: "acrylic_latex",
    slug: "dap-alex-plus-acrylic-latex-caulk-plus-silicone",
    open_time_min: 10,       // Tooling Time: 10 minutes
    clamp_time_min: null,
    dry_to_touch_min: 30,    // Tack Free: 30 minutes
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(24), // Full Dry Through: 24 hours
    humidity_behaviour: "negative",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 40, // Application Temperature Range: 40°F to 100°F
    max_application_temp_f: 100,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.dap.com/en-us/products/alex-plus-acrylic-latex-caulk-plus-silicone/",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── DAP Weldwood Original Contact Cement ────────────────────────────────
  // TDS: DAP Weldwood Original Contact Cement (DAP TDS, rev. 08/2018)
  // Source: confirmed from uploaded PDF
  // "Reaches maximum holding strength in 7 days" — explicit upper bound.
  {
    manufacturer: "DAP",
    product_name: "Weldwood Original Contact Cement",
    category: "adhesive",
    sub_category: "contact_cement",
    slug: "dap-weldwood-original-contact-cement",
    open_time_min: 120,     // Open time: up to 2 hours (120 min)
    clamp_time_min: null,   // Contact cement bonds on contact; no clamping
    dry_to_touch_min: null,
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(168), // 7 days — explicitly stated maximum holding strength
    humidity_behaviour: "negative",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 65, // Application Temperature: 65°F to 120°F
    max_application_temp_f: 120,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.dap.com/en-us/products/weldwood-original-contact-cement/",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── DAP Kwik Seal Plus Kitchen & Bath Adhesive Sealant ──────────────────
  // TDS: DAP Kwik Seal Plus Premium Kitchen & Bath Adhesive Sealant (DAP TDS, 7/25/2019)
  // Source: confirmed from uploaded PDF
  {
    manufacturer: "DAP",
    product_name: "Kwik Seal Plus Premium Kitchen & Bath Adhesive Sealant",
    category: "sealant",
    sub_category: "acrylic_latex",
    slug: "dap-kwik-seal-plus-kitchen-bath-sealant",
    open_time_min: 10,     // Tooling Time (Working Time): 10 minutes
    clamp_time_min: null,
    dry_to_touch_min: 15,  // Tack Free Time: 15 minutes
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(18), // Full Dry Through: 18 hours
    humidity_behaviour: "negative",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 40,  // Application Temperature Range: 40°F to 120°F
    max_application_temp_f: 120,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.dap.com/en-us/products/kwik-seal-plus-premium-kitchen-bath-adhesive-caulk/",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── GE All Purpose Silicone 1 Window & Door Sealant ─────────────────────
  // TDS: GE All Purpose Silicone 1 Window & Door Sealant (Henkel/GE, Rev. May 1, 2023)
  // Source: confirmed from uploaded PDF
  {
    manufacturer: "GE",
    product_name: "All Purpose Silicone 1 Window & Door Sealant",
    category: "sealant",
    sub_category: "silicone",
    slug: "ge-all-purpose-silicone-1-window-door",
    open_time_min: 10,     // Tooling / Open Time: 5–10 minutes
    clamp_time_min: null,
    dry_to_touch_min: 30,  // Skin Time / Tack Free: 30 minutes
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(24), // Cure Time: 24 hours (at 73°F/50% RH)
    humidity_behaviour: "bell_curve",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 32, // Application Temperature: above 32°F (0°C)
    max_application_temp_f: 120, // Application Temperature: below 120°F (49°C)
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: true,
    structural_liability: false, // TDS explicitly states "not for structural repairs"
    substrate_porosity_factor: null,
    tds_url:
      "https://www.gesealants.com/products/all-purpose-silicone-1-window-door-sealant",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── Sakrete Maximizer Concrete Mix ──────────────────────────────────────
  // TDS: Sakrete Maximizer Concrete Mix (Sakrete datasheet, Rev. 05/20)
  // Source: confirmed from uploaded PDF
  // structural_liability=true: explicitly listed for structural applications
  // (foundation walls, footings, structural applications requiring concrete)
  {
    manufacturer: "Sakrete",
    product_name: "Maximizer Concrete Mix",
    category: "concrete",
    sub_category: null,
    slug: "sakrete-maximizer-concrete-mix",
    open_time_min: null,
    clamp_time_min: null,
    dry_to_touch_min: 1440, // foot traffic at 24 hours per datasheet
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(672), // 28 days (5,500 psi compressive strength)
    humidity_behaviour: "hydration",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 40, // Explicit: "between 40°F (4°C) and 90°F (32°C)"
    max_application_temp_f: 90,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: true,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.sakrete.com/products/concrete-repair-mortar/maximizer-concrete-mix",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── Titebond Instant Bond Adhesive Gel ──────────────────────────────────
  // TDS: Titebond Instant Bond Adhesive Gel product data page (titebond.com/print/product/...)
  // Source: official Titebond product print page (saved HTML), confirmed from uploaded file
  // min temp: "Application Temperature: Above 50°F (10°C)" — explicit.
  // max temp: "For best results, apply between 55°F and 85°F" (Limitations section) —
  //   only upper-bound figure on the page; same interpretation precedent as Loctite PL400.
  // Humidity: cyanoacrylates polymerise via surface/atmospheric moisture → "positive".
  // Times are sub-minute; integer fields floored to 1 min minimum.
  {
    manufacturer: "Titebond",
    product_name: "Instant Bond Adhesive Gel",
    category: "adhesive",
    sub_category: "cyanoacrylate",
    slug: "titebond-instant-bond-adhesive-gel",
    open_time_min: 1,           // Assembly time: 30 seconds (stated); rounded up to 1 min (Int field)
    clamp_time_min: 1,          // Set: 20 seconds; initial cure: 60 seconds → 1 min
    dry_to_touch_min: 1,        // Initial cure 60 seconds → 1 min
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(8), // "*Full cure in 8 hours" — explicit
    humidity_behaviour: "positive",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 50,  // Explicit: "Application Temperature: Above 50°F (10°C)"
    max_application_temp_f: 85,  // Limitations: "For best results, apply between 55°F and 85°F"
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.titebond.com/print/product/9059d175-2198-4bbe-90d1-f2406dd7049a",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── Loctite PL400 Subfloor & Deck Construction Adhesive ─────────────────  // TDS: Loctite PL400 Subfloor Construction Adhesive (Henkel TDS, rev. 01/11/2022)
  // Source: confirmed from uploaded PDF
  // Cure time stated as range: "2–7 days at 78°F/50%RH" — using upper bound (168h).
  // Application Temperature explicitly stated: 0°F (-18°C) to 100°F (38°C).
  {
    manufacturer: "Loctite",
    product_name: "PL400 Subfloor & Deck Construction Adhesive",
    category: "adhesive",
    sub_category: "synthetic_rubber",
    slug: "loctite-pl400-subfloor-deck-construction-adhesive",
    open_time_min: 15,      // Working Time: 15 minutes
    clamp_time_min: null,
    dry_to_touch_min: null,
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(168), // TDS states 2–7 days; conservative upper bound used
    humidity_behaviour: "negative",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 0,   // Explicit: "Apply between 0°F (-18°C) and 100°F (38°C)"
    max_application_temp_f: 100,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/tds-loctite-pl400.pdf",
    tds_last_verified: new Date("2026-05-21"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── DAP Dynaflex Ultra Advanced Exterior Sealant ────────────────────────
  // TDS: DAP Dynaflex Ultra Advanced Exterior Sealant for Windows, Doors, Siding & Trim
  //      (DAP Products Inc., dated 2/25/2019)
  // Source: confirmed from uploaded PDF
  // Full performance: "Sealant reaches full performance in 72 hours" — explicit in application
  //   instructions. "Full Dry Through: 7-14 days" is the color transition (white→clear),
  //   not the functional cure milestone; 72h used for full_cure_hours.
  // Application Temperature Range: 40°F to 100°F — explicit table field.
  {
    manufacturer: "DAP",
    product_name: "Dynaflex Ultra Advanced Exterior Sealant",
    category: "sealant",
    sub_category: "acrylic_latex",
    slug: "dap-dynaflex-ultra-advanced-exterior-sealant",
    open_time_min: 15,         // Tooling Time (Working Time): 10–15 minutes; upper bound
    clamp_time_min: null,
    dry_to_touch_min: 60,      // Tack Free Time: 60 minutes
    dry_to_recoat_min: 60,     // Paint Ready Time: 1 hour
    full_cure_hours: new Prisma.Decimal(72), // "Sealant reaches full performance in 72 hours"
    humidity_behaviour: "negative",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 40,  // Application Temperature Range: 40°F to 100°F
    max_application_temp_f: 100,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.dap.com/en-us/products/dynaflex-ultra-advanced-exterior-sealant/",
    tds_last_verified: new Date("2026-05-22"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── Liquid Nails Heavy Duty Construction Adhesive LN-903 ────────────────
  // TDS: Liquid Nails Heavy Duty LN-903 (PPG Architectural Finishes, rev. 5/2022)
  // Source: confirmed from uploaded PDF
  // "MINIMUM CURE TIME: 24 hours at room temperature" — explicit minimum only.
  // Shear strength table peaks at 7 days (240 psi vs 150 psi at 24h), indicating
  //   full cure is 7 days; conservative upper bound 168h used for full_cure_hours.
  // Application Temperature: 40°F to 100°F — confirmed in Product Data table AND
  //   "Permissible Temperatures During Application" section (both material & substrate).
  {
    manufacturer: "Liquid Nails",
    product_name: "Heavy Duty Interior/Exterior Construction Adhesive",
    category: "adhesive",
    sub_category: "acrylic_latex",
    slug: "liquid-nails-heavy-duty-construction-adhesive-ln903",
    open_time_min: 20,         // Open Time: 20 minutes at room temperature
    clamp_time_min: null,
    dry_to_touch_min: null,
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(168), // 7 days — shear strength peaks at 7-day datapoint
    humidity_behaviour: "negative",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 40,  // Application Temperature: 40°F to 100°F
    max_application_temp_f: 100,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.liquidnails.com/sites/default/files/product-data-sheet/LN-903_Data_Sheet.pdf",
    tds_last_verified: new Date("2026-05-22"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── Loctite PL 500 Landscape Construction Adhesive ──────────────────────
  // TDS: Loctite PL 500 Landscape Construction Adhesive (Henkel TDS, rev. July 12, 2021)
  // Source: confirmed from uploaded PDF (Ref. #459029)
  // Cure time: "2 to 7 days* at 78°F (25°C) and 50% RH" — conservative upper bound (168h).
  // Clamping Time: 24 hours — explicit field in 2021 TDS.
  // Application Temperature: "Apply and cure between 0°F (-18°C) and below 100°F (38°C)" —
  //   older 2015 TDS states exactly 100°F; 100°F used as the ceiling.
  {
    manufacturer: "Loctite",
    product_name: "PL 500 Landscape Construction Adhesive",
    category: "adhesive",
    sub_category: "synthetic_rubber",
    slug: "loctite-pl500-landscape-construction-adhesive",
    open_time_min: 15,         // Open Time: 15 minutes
    clamp_time_min: 1440,      // Clamping Time: 24 hours (explicit field in 2021 TDS)
    dry_to_touch_min: null,
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(168), // 2–7 days; conservative upper bound used
    humidity_behaviour: "negative",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 0,   // Explicit: "Apply and cure between 0°F (-18°C) and below 100°F"
    max_application_temp_f: 100,
    mfft_celsius: null,
    amine_blush_risk: false,
    dew_point_warning: false,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/TDS_Loctite_PL500_Landscape.pdf",
    tds_last_verified: new Date("2026-05-22"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },

  // ─── Loctite Epoxy Weld Bonding Compound ─────────────────────────────────
  // TDS: Loctite Epoxy Weld Bonding Compound (Henkel TDS, rev. June 1, 2010; Ref. 390139/390127)
  // Source: confirmed from uploaded PDF
  // Full cure: "Parts can be machined within 16 to 24 hours" — machining = fully cured.
  //   Shear strength on cold-rolled steel: 3355 psi at 24h vs 3483 psi at 8 days (3.8% gain),
  //   confirming full cure is effectively reached at 24h; 24h used for full_cure_hours.
  // Hardener explicitly contains "amine resin" — amine_blush_risk=TRUE.
  {
    manufacturer: "Loctite",
    product_name: "Epoxy Weld Bonding Compound",
    category: "adhesive",
    sub_category: "epoxy",
    slug: "loctite-epoxy-weld-bonding-compound",
    open_time_min: 6,          // Set Time: 4–6 minutes (upper bound)
    clamp_time_min: 15,        // Handling Time: 10–15 minutes (upper bound)
    dry_to_touch_min: null,
    dry_to_recoat_min: null,
    full_cure_hours: new Prisma.Decimal(24), // Machining Time: 16–24h; strength plateaus at 24h
    humidity_behaviour: "neutral",
    temp_doubling_celsius: new Prisma.Decimal(10),
    min_application_temp_f: 39,  // Application Temperature: 39°F (4°C) to 95°F (35°C)
    max_application_temp_f: 95,
    mfft_celsius: null,
    amine_blush_risk: true,
    dew_point_warning: true,
    silicone_bell_curve: false,
    structural_liability: false,
    substrate_porosity_factor: null,
    tds_url:
      "https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/tds-loctite-epoxy-weld.pdf",
    tds_last_verified: new Date("2026-05-22"),
    verified_by_human: false,
    amazon_asin: null,
    home_depot_sku: null,
  },
];

async function main() {
  console.log(`Seeding ${products.length} products…`);

  for (const product of products) {
    const result = await prisma.product.upsert({
      where: { slug: product.slug as string },
      update: product,
      create: product,
    });
    console.log(`  ✓ ${result.manufacturer} — ${result.product_name} (id ${result.id})`);
  }

  console.log("Done. All rows have verified_by_human=false.");
  console.log("Run a manual TDS check for each row before setting verified_by_human=true.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
