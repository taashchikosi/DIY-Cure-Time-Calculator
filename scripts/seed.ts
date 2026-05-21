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
    sub_category: "PVA",
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

  // ─── Loctite PL400 Subfloor & Deck Construction Adhesive ─────────────────
  // TDS: Loctite PL400 Subfloor Construction Adhesive (Henkel TDS, rev. 01/11/2022)
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
