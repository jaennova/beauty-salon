import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = import.meta.env.DATABASE_URL;

// Connection for migrations
export const migrationClient = postgres(connectionString, { max: 1 });

// Connection for queries
const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });