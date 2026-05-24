-- DIY Cure Time Calculator — Product Seed
-- Paste this entire file into the Supabase SQL Editor and click Run.
-- Uses ON CONFLICT (slug) DO UPDATE so it's safe to re-run.

INSERT INTO products (
  manufacturer, product_name, category, sub_category, slug,
  open_time_min, clamp_time_min, dry_to_touch_min, dry_to_recoat_min,
  full_cure_hours, humidity_behaviour, temp_doubling_celsius,
  min_application_temp_f, max_application_temp_f, mfft_celsius,
  amine_blush_risk, dew_point_warning, silicone_bell_curve, structural_liability,
  substrate_porosity_factor, tds_url, tds_last_verified, verified_by_human,
  amazon_asin, home_depot_sku, updated_at
) VALUES

-- 1. DAP Dynaflex 230 Premium Sealant
('DAP', 'Dynaflex 230 Premium Sealant', 'sealant', 'acrylic_latex',
 'dap-dynaflex-230-premium-sealant',
 NULL, NULL, 15, NULL,
 168, 'negative', 10, 40, 100, NULL,
 false, false, false, false, NULL,
 'https://www.dap.com/media/4209/dynaflex-230-tds.pdf',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 2. GE Advanced Silicone 2 Window & Door
('GE', 'Advanced Silicone 2 Window & Door Sealant', 'sealant', 'silicone',
 'ge-advanced-silicone-2-window-door',
 5, NULL, 30, NULL,
 24, 'bell_curve', 10, 32, 120, NULL,
 false, false, true, false, NULL,
 'https://www.momentive.com/en-US/categories/sealants/ge-advanced-silicone2-window-door/',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 3. Loctite PL 375 Heavy Duty Construction Adhesive
('Loctite', 'PL 375 Heavy Duty Construction Adhesive', 'adhesive', 'PVA_construction',
 'loctite-pl-375-heavy-duty-construction-adhesive',
 60, NULL, NULL, NULL,
 48, 'negative', 10, 40, 100, 4,
 false, false, false, false, NULL,
 'https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/tds-loctite-pl-375.pdf',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 4. Loctite PL Premium Polyurethane Construction Adhesive
('Loctite', 'PL Premium Polyurethane Construction Adhesive', 'adhesive', 'polyurethane',
 'loctite-pl-premium-polyurethane-construction-adhesive',
 15, 1440, NULL, NULL,
 48, 'positive', 10, 41, 95, NULL,
 false, false, false, false, NULL,
 'https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/tds-loctite-pl-premium.pdf',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 5. Sakrete 5000 Plus Concrete Mix
('Sakrete', '5000 Plus Concrete Mix', 'concrete', NULL,
 'sakrete-5000-plus-concrete-mix',
 NULL, NULL, 1440, NULL,
 672, 'hydration', 10, 40, 90, NULL,
 false, false, false, true, NULL,
 'https://www.sakrete.com/products/concrete-repair-mortar/5000-plus-concrete-mix',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 6. Gorilla Glue Original Polyurethane Adhesive
('Gorilla Glue', 'Gorilla Glue Original Polyurethane Adhesive', 'adhesive', 'polyurethane',
 'gorilla-glue-original-polyurethane-adhesive',
 10, 240, NULL, NULL,
 24, 'positive', 10, 50, 86, NULL,
 false, false, false, false, NULL,
 'https://www.gorillaglue.com/wp-content/uploads/2016/07/Gorilla-Glue-TDS.pdf',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 7. DAP All Purpose RTV 100% Silicone Sealant
('DAP', 'All Purpose RTV 100% Silicone Sealant', 'sealant', 'silicone',
 'dap-all-purpose-rtv-100-silicone-sealant',
 10, NULL, 20, NULL,
 24, 'bell_curve', 10, -4, 120, NULL,
 false, false, true, false, NULL,
 'https://www.dap.com/media/all-purpose-rtv-100-silicone-tds.pdf',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 8. Loctite Epoxy Quick Set
('Loctite', 'Epoxy Quick Set', 'adhesive', 'epoxy',
 'loctite-epoxy-quick-set',
 10, 10, NULL, NULL,
 24, 'neutral', 10, 39, 95, NULL,
 true, true, false, false, NULL,
 'https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/tds-loctite-epoxy-quick-set.pdf',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 9. DAP Alex Plus Acrylic Latex Caulk Plus Silicone
('DAP', 'Alex Plus Acrylic Latex Caulk Plus Silicone', 'sealant', 'acrylic_latex',
 'dap-alex-plus-acrylic-latex-caulk-plus-silicone',
 10, NULL, 30, NULL,
 24, 'negative', 10, 40, 100, NULL,
 false, false, false, false, NULL,
 'https://www.dap.com/en-us/products/alex-plus-acrylic-latex-caulk-plus-silicone/',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 10. DAP Weldwood Original Contact Cement
('DAP', 'Weldwood Original Contact Cement', 'adhesive', 'contact_cement',
 'dap-weldwood-original-contact-cement',
 120, NULL, NULL, NULL,
 168, 'negative', 10, 65, 120, NULL,
 false, false, false, false, NULL,
 'https://www.dap.com/en-us/products/weldwood-original-contact-cement/',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 11. DAP Kwik Seal Plus Kitchen & Bath Sealant
('DAP', 'Kwik Seal Plus Premium Kitchen & Bath Adhesive Sealant', 'sealant', 'acrylic_latex',
 'dap-kwik-seal-plus-kitchen-bath-sealant',
 10, NULL, 15, NULL,
 18, 'negative', 10, 40, 120, NULL,
 false, false, false, false, NULL,
 'https://www.dap.com/en-us/products/kwik-seal-plus-premium-kitchen-bath-adhesive-caulk/',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 12. GE All Purpose Silicone 1 Window & Door Sealant
('GE', 'All Purpose Silicone 1 Window & Door Sealant', 'sealant', 'silicone',
 'ge-all-purpose-silicone-1-window-door',
 10, NULL, 30, NULL,
 24, 'bell_curve', 10, 32, 120, NULL,
 false, false, true, false, NULL,
 'https://www.gesealants.com/products/all-purpose-silicone-1-window-door-sealant',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 13. Sakrete Maximizer Concrete Mix
('Sakrete', 'Maximizer Concrete Mix', 'concrete', NULL,
 'sakrete-maximizer-concrete-mix',
 NULL, NULL, 1440, NULL,
 672, 'hydration', 10, 40, 90, NULL,
 false, false, false, true, NULL,
 'https://www.sakrete.com/products/concrete-repair-mortar/maximizer-concrete-mix',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 14. Loctite PL400 Subfloor & Deck Construction Adhesive
('Loctite', 'PL400 Subfloor & Deck Construction Adhesive', 'adhesive', 'synthetic_rubber',
 'loctite-pl400-subfloor-deck-construction-adhesive',
 15, NULL, NULL, NULL,
 168, 'negative', 10, 0, 100, NULL,
 false, false, false, false, NULL,
 'https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/tds-loctite-pl400.pdf',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 15. Titebond Instant Bond Adhesive Gel
('Titebond', 'Instant Bond Adhesive Gel', 'adhesive', 'cyanoacrylate',
 'titebond-instant-bond-adhesive-gel',
 1, 1, 1, NULL,
 8, 'positive', 10, 50, 85, NULL,
 false, false, false, false, NULL,
 'https://www.titebond.com/print/product/9059d175-2198-4bbe-90d1-f2406dd7049a',
 '2026-05-21', false, NULL, NULL, NOW()),

-- 16. DAP Dynaflex Ultra Advanced Exterior Sealant
('DAP', 'Dynaflex Ultra Advanced Exterior Sealant', 'sealant', 'acrylic_latex',
 'dap-dynaflex-ultra-advanced-exterior-sealant',
 15, NULL, 60, 60,
 72, 'negative', 10, 40, 100, NULL,
 false, false, false, false, NULL,
 'https://www.dap.com/en-us/products/dynaflex-ultra-advanced-exterior-sealant/',
 '2026-05-22', false, NULL, NULL, NOW()),

-- 17. Liquid Nails Heavy Duty LN-903
('Liquid Nails', 'Heavy Duty Interior/Exterior Construction Adhesive', 'adhesive', 'acrylic_latex',
 'liquid-nails-heavy-duty-construction-adhesive-ln903',
 20, NULL, NULL, NULL,
 168, 'negative', 10, 40, 100, NULL,
 false, false, false, false, NULL,
 'https://www.liquidnails.com/sites/default/files/product-data-sheet/LN-903_Data_Sheet.pdf',
 '2026-05-22', false, NULL, NULL, NOW()),

-- 18. Loctite PL 500 Landscape Construction Adhesive
('Loctite', 'PL 500 Landscape Construction Adhesive', 'adhesive', 'synthetic_rubber',
 'loctite-pl500-landscape-construction-adhesive',
 15, 1440, NULL, NULL,
 168, 'negative', 10, 0, 100, NULL,
 false, false, false, false, NULL,
 'https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/TDS_Loctite_PL500_Landscape.pdf',
 '2026-05-22', false, NULL, NULL, NOW()),

-- 19. Loctite Epoxy Weld Bonding Compound
('Loctite', 'Epoxy Weld Bonding Compound', 'adhesive', 'epoxy',
 'loctite-epoxy-weld-bonding-compound',
 6, 15, NULL, NULL,
 24, 'neutral', 10, 39, 95, NULL,
 true, true, false, false, NULL,
 'https://www.loctiteproducts.com/content/dam/loctite/en-US/documents/tds/tds-loctite-epoxy-weld.pdf',
 '2026-05-22', false, NULL, NULL, NOW()),

-- 20. Gorilla Wood Glue (PVA; TDS: RS Online c326/A700000006570636; open 5-10 min, clamp 20-30 min, cure 24h, 55–75°F)
('Gorilla Glue', 'Gorilla Wood Glue', 'adhesive', 'PVA',
 'gorilla-wood-glue',
 5, 20, NULL, NULL,
 24, 'negative', 10, 55, 75, 13,
 false, false, false, false, NULL,
 'https://docs.rs-online.com/c326/A700000006570636.pdf',
 '2026-05-24', false, NULL, NULL, NOW()),

-- 21. Titebond Original Wood Glue (aliphatic resin; chalk temp 50°F; open 4-6 min, clamp 30 min, cure 24h; no max temp in TDS)
('Franklin International', 'Titebond Original Wood Glue', 'adhesive', 'aliphatic_resin',
 'titebond-original-wood-glue',
 4, 30, NULL, NULL,
 24, 'negative', 10, 50, NULL, 10,
 false, false, false, false, NULL,
 'https://www.titebond.com/product/glues/d4d28015-603f-4dfc-a7d9-f684acc71207',
 '2026-05-24', false, NULL, NULL, NOW()),

-- 22. Titebond II Premium Wood Glue (aliphatic resin; chalk temp 55°F; open 3-5 min, clamp 30 min, cure 24h; no max temp in TDS)
('Franklin International', 'Titebond II Premium Wood Glue', 'adhesive', 'aliphatic_resin',
 'titebond-ii-premium-wood-glue',
 3, 30, NULL, NULL,
 24, 'negative', 10, 55, NULL, 13,
 false, false, false, false, NULL,
 'https://www.titebond.com/product/glues/2ef3e95d-48d2-43bc-8e1b-217a38930fa2',
 '2026-05-24', false, NULL, NULL, NOW()),

-- 23. Titebond III Ultimate Wood Glue (aliphatic resin; chalk temp 47°F; open 8-10 min, clamp 30 min, cure 24h; no max temp in TDS)
('Franklin International', 'Titebond III Ultimate Wood Glue', 'adhesive', 'aliphatic_resin',
 'titebond-iii-ultimate-wood-glue',
 8, 30, NULL, NULL,
 24, 'negative', 10, 47, NULL, 8,
 false, false, false, false, NULL,
 'https://www.titebond.com/product/glues/e8d40b45-0ab3-49f7-8a9c-b53970f736af',
 '2026-05-24', false, NULL, NULL, NOW())

ON CONFLICT (slug) DO UPDATE SET
  manufacturer            = EXCLUDED.manufacturer,
  product_name            = EXCLUDED.product_name,
  category                = EXCLUDED.category,
  sub_category            = EXCLUDED.sub_category,
  open_time_min           = EXCLUDED.open_time_min,
  clamp_time_min          = EXCLUDED.clamp_time_min,
  dry_to_touch_min        = EXCLUDED.dry_to_touch_min,
  dry_to_recoat_min       = EXCLUDED.dry_to_recoat_min,
  full_cure_hours         = EXCLUDED.full_cure_hours,
  humidity_behaviour      = EXCLUDED.humidity_behaviour,
  temp_doubling_celsius   = EXCLUDED.temp_doubling_celsius,
  min_application_temp_f  = EXCLUDED.min_application_temp_f,
  max_application_temp_f  = EXCLUDED.max_application_temp_f,
  mfft_celsius            = EXCLUDED.mfft_celsius,
  amine_blush_risk        = EXCLUDED.amine_blush_risk,
  dew_point_warning       = EXCLUDED.dew_point_warning,
  silicone_bell_curve     = EXCLUDED.silicone_bell_curve,
  structural_liability    = EXCLUDED.structural_liability,
  substrate_porosity_factor = EXCLUDED.substrate_porosity_factor,
  tds_url                 = EXCLUDED.tds_url,
  tds_last_verified       = EXCLUDED.tds_last_verified,
  amazon_asin             = EXCLUDED.amazon_asin,
  home_depot_sku          = EXCLUDED.home_depot_sku,
  updated_at              = NOW();
