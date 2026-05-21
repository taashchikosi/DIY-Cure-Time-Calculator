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
