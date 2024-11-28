import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL environment variable is not set');
// }

const connectionString = "postgresql://salon_owner:8mNL3ThzaSxE@ep-black-mode-a5o4d15w.us-east-2.aws.neon.tech/salon?sslmode=require";

// Connection for migrations
export const migrationClient = postgres(connectionString, { max: 1 });

// Connection for queries with connection pooling
const queryClient = postgres(connectionString, {
  max: 20,
  idle_timeout: 20,
  connect_timeout: 10
});

export const db = drizzle(queryClient, { schema });