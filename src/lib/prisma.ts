import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

let _instance: PrismaClient | undefined;

function getInstance(): PrismaClient {
  if (_instance) return _instance;
  const connectionString =
    process.env.DATABASE_URL ??
    "postgresql://postgres:postgres@localhost:5432/ustazalemi";
  const adapter = new PrismaPg({ connectionString });
  _instance = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
  return _instance;
}

// Lazy proxy — importing this module does NOT initialize Prisma.
// Initialization happens only when a model property is first accessed at runtime.
export const prisma = new Proxy<PrismaClient>({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const client = getInstance();
    const val = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === "function" ? (val as Function).bind(client) : val;
  },
});

export default prisma;
