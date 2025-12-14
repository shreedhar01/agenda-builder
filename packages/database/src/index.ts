import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import { neon } from '@neondatabase/serverless';
import postgres from 'postgres';

const databaseUrl = process.env.DATABASE_URL!;

const isNeon = databaseUrl.includes('neon.tech') || databaseUrl.includes('neon.postgres');

export const db = isNeon
  ? drizzleNeon(neon(databaseUrl))
  : drizzlePostgres(postgres(databaseUrl));

export * as drizzleOrm from "drizzle-orm";