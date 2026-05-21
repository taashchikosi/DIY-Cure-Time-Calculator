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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  datasource: {
    // Port 6543 = Supabase pooler (pgbouncer) — required for serverless
    url: process.env["DATABASE_URL"]!,
    // Port 5432 = direct connection — used by Prisma Migrate only.
    // directUrl is not yet in Prisma 7 TypeScript types but IS accepted at runtime.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(process.env["DIRECT_URL"] ? { directUrl: process.env["DIRECT_URL"] } as any : {}),
  },
});
