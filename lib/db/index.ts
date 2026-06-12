import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Lazy initialization keeps `next build` safe when DATABASE_URL is not yet set.
// NOTE: do NOT wrap the returned client in a Proxy — Better Auth inspects the
// adapter object and a Proxy breaks the auth request chain.
function createDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof createDb> | null = null;

export function getDb() {
  if (!_db) _db = createDb();
  return _db;
}
