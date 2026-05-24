## Non-Negotiable Quality Rule
NEVER generate, invent, or approximate product data. Every field in the products table
must come from the manufacturer's official Technical Data Sheet (TDS). If a TDS is not
available, do not create the row. verified_by_human must only be set to TRUE after the
owner has manually confirmed the data against the source TDS PDF. No exceptions.

You are an autonomous software engineer maintaining a programmatic SEO calculator site.
The site is LIVE at https://diy-cure-calculator.netlify.app.
Host on Netlify Free — NOT Vercel Hobby (Hobby bans affiliate/AdSense sites).
Use TypeScript exclusively. Use pnpm as the package manager.
Use ISR (export const revalidate = 86400) for product pages.
Keep calculation logic server-side only (/api/calculate route) — never expose to client.
Only add pages to sitemap.xml when verified_by_human=TRUE.
Never commit .env files to GitHub.
Ask for confirmation before spending any money or creating paid accounts.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS v4 — uses `@import "tailwindcss"` syntax, NO tailwind.config.js
- Prisma 7 with Supabase Postgres
- Upstash Redis for rate limiting on /api/calculate
- Hosting: Netlify Free with @netlify/plugin-nextjs
- Package manager: pnpm (never npm or yarn)

## Critical Database Config
- DATABASE_URL: port 6543 + pgbouncer=true&connection_limit=1
- DIRECT_URL: port 5432 (for migrations only)
- Cannot connect to DB from cloud environment — provide ALTER TABLE SQL for user to run in Supabase SQL Editor
- Schema changes: update schema.prisma → run `pnpm prisma generate` → provide SQL

## Git Workflow
- Netlify deploys from `main`
- Develop on `claude/plan-session-DWOhG`
- After changes: commit to dev branch → merge to main → push both

## Color System (globals.css — use inline style={{ }}, not Tailwind arbitrary values)
- --bg-main: #0d0905  --bg-surface: #181108  --bg-card: #211608  --bg-elevated: #2c1e0d
- --border-dim: #3a2810  --border-main: #55381a
- --gold: #c8892a  --gold-bright: #e8b446  --gold-dim: #7a5218
- --cream: #f0e2c0  --cream-muted: #a07a50  --cream-dim: #5a4028

## Calculator Logic (src/lib/calculator.ts)
- Q10 temperature: adjusted_time = base_time × 2^((21 - actual_temp_c) / temp_doubling_celsius)
  Baseline is 21°C (70°F / 50% RH lab standard)
- Humidity branches: negative | positive | bell_curve | neutral | hydration
- max_application_temp_f is Int? (nullable) — some TDS omit a max temp; skip the check if null
- mfft_celsius triggers chalk/film-forming warning if temp_c falls below it (any product)

## Safety Guardrails (non-optional)
- Epoxy amine blush: amine_blush_risk=TRUE + RH>70% or near dew point → RED warning
- PVA/aliphatic chalk: mfft_celsius set + temp_c < mfft_celsius → RED warning
- Silicone skinning: silicone_bell_curve=TRUE + RH>70% → AMBER warning
- Concrete structural: structural_liability=TRUE → persistent info banner
- Universal disclaimer on every page and calculation result

## Category URL → DB Mapping
- wood-glue        → category='adhesive' AND sub_category IN ['PVA','aliphatic_resin']
- epoxy            → category='adhesive' AND sub_category='epoxy'
- silicone-caulk   → category='sealant'
- construction-adhesive → category='adhesive' AND sub_category IN ['polyurethane','PVA_construction','contact_cement','synthetic_rubber','acrylic_latex','cyanoacrylate']
- concrete         → category='concrete'
NOTE: 'PVA' sub_category = wood glues only. Construction PVA uses 'PVA_construction'.

## URL Structure
- / — homepage
- /[product-slug] — product pages (ISR 24hr)
- /category/[slug] — category hubs (no verified_by_human filter)
- /[product-slug]/on-[substrate] — use-case pages (not yet built)
- /compare/[p1]-vs-[p2] — comparison pages (not yet built)
- /api/calculate — server-side POST only, Upstash rate limited
- /sitemap.xml — only verified_by_human=TRUE products

## Legal Pages (all built, dark themed, email: diycurecalc@outlook.com)
/privacy, /terms, /about, /contact, /disclosure

## Never
- Never expose calculation logic client-side
- Never commit .env files
- Never add to sitemap without verified_by_human=TRUE
- Never apply for Amazon Associates before 50+ daily visitors
- Never apply for AdSense before 30+ pages + 60 days indexed
- Never use npm or yarn (pnpm only)
- Never invent product data
