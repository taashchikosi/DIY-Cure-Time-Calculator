# Project Handoff

## Current State
Site is LIVE at https://diy-cure-calculator.netlify.app  
Latest commit: `9bde19b` on `main`  
23 products in DB (19 verified_by_human=TRUE, 4 newly added pending Supabase SQL below)

## Pending: Run These in Supabase SQL Editor

### Step 1 — Make max_application_temp_f nullable (one-time migration)
```sql
ALTER TABLE products ALTER COLUMN max_application_temp_f DROP NOT NULL;
```

### Step 2 — Seed 4 new wood glue products
```sql
INSERT INTO products (
  manufacturer, product_name, category, sub_category, slug,
  open_time_min, clamp_time_min, dry_to_touch_min, dry_to_recoat_min,
  full_cure_hours, humidity_behaviour, temp_doubling_celsius,
  min_application_temp_f, max_application_temp_f, mfft_celsius,
  amine_blush_risk, dew_point_warning, silicone_bell_curve, structural_liability,
  substrate_porosity_factor, tds_url, tds_last_verified, verified_by_human,
  amazon_asin, home_depot_sku, updated_at
) VALUES
('Gorilla Glue', 'Gorilla Wood Glue', 'adhesive', 'PVA',
 'gorilla-wood-glue', 5, 20, NULL, NULL,
 24, 'negative', 10, 55, 75, 13,
 false, false, false, false, NULL,
 'https://docs.rs-online.com/c326/A700000006570636.pdf',
 '2026-05-24', false, NULL, NULL, NOW()),
('Franklin International', 'Titebond Original Wood Glue', 'adhesive', 'aliphatic_resin',
 'titebond-original-wood-glue', 4, 30, NULL, NULL,
 24, 'negative', 10, 50, NULL, 10,
 false, false, false, false, NULL,
 'https://www.titebond.com/product/glues/d4d28015-603f-4dfc-a7d9-f684acc71207',
 '2026-05-24', false, NULL, NULL, NOW()),
('Franklin International', 'Titebond II Premium Wood Glue', 'adhesive', 'aliphatic_resin',
 'titebond-ii-premium-wood-glue', 3, 30, NULL, NULL,
 24, 'negative', 10, 55, NULL, 13,
 false, false, false, false, NULL,
 'https://www.titebond.com/product/glues/2ef3e95d-48d2-43bc-8e1b-217a38930fa2',
 '2026-05-24', false, NULL, NULL, NOW()),
('Franklin International', 'Titebond III Ultimate Wood Glue', 'adhesive', 'aliphatic_resin',
 'titebond-iii-ultimate-wood-glue', 8, 30, NULL, NULL,
 24, 'negative', 10, 47, NULL, 8,
 false, false, false, false, NULL,
 'https://www.titebond.com/product/glues/e8d40b45-0ab3-49f7-8a9c-b53970f736af',
 '2026-05-24', false, NULL, NULL, NOW())
ON CONFLICT (slug) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer, product_name = EXCLUDED.product_name,
  category = EXCLUDED.category, sub_category = EXCLUDED.sub_category,
  open_time_min = EXCLUDED.open_time_min, clamp_time_min = EXCLUDED.clamp_time_min,
  full_cure_hours = EXCLUDED.full_cure_hours, humidity_behaviour = EXCLUDED.humidity_behaviour,
  temp_doubling_celsius = EXCLUDED.temp_doubling_celsius,
  min_application_temp_f = EXCLUDED.min_application_temp_f,
  max_application_temp_f = EXCLUDED.max_application_temp_f,
  mfft_celsius = EXCLUDED.mfft_celsius, tds_url = EXCLUDED.tds_url,
  tds_last_verified = EXCLUDED.tds_last_verified, updated_at = NOW();
```

### Step 3 — Verify the new products (after reviewing TDS yourself)
```sql
UPDATE products SET verified_by_human = TRUE
WHERE slug IN (
  'gorilla-wood-glue',
  'titebond-original-wood-glue',
  'titebond-ii-premium-wood-glue',
  'titebond-iii-ultimate-wood-glue'
);
```

## Next Steps

1. Run the 3 SQL queries above in Supabase
2. Trigger a Netlify redeploy (or wait 24h for ISR cache to expire)
3. Submit sitemap to Google Search Console: https://diy-cure-calculator.netlify.app/sitemap.xml
4. Set up custom domain `diycuretimecalculator.com` in Netlify → Domain management
5. Add real product image URLs to Supabase (`UPDATE products SET product_image_url = '...' WHERE slug = '...'`)
6. Add more products to reach 25+ (AdSense threshold) — supply TDS PDFs or URLs

## Monetisation Milestones
- Amazon Associates: apply after 50+ daily visitors (then fill `amazon_asin` column)
- AdSense: apply after 30+ indexed pages + 60 days live

## Known Issues
- Wood Glue category empty until Supabase SQL above is run
- All product images are placeholders (category-icon SVGs) — populate `product_image_url` to show real photos
- ISR: 24h cache means DB changes don't show immediately; trigger Netlify redeploy to force refresh
