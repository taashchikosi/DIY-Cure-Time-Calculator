import { config } from "dotenv";
// Load .env.local first (Next.js convention), fall back to .env
config({ path: ".env.local" });
config();
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Port 6543 = Supabase pooler (pgbouncer) — required for serverless
    url: process.env["DATABASE_URL"]!,
    // Port 5432 = direct connection — used for migrate operations only
    directUrl: process.env["DIRECT_URL"],
  },
});
