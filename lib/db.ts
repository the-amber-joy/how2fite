import { neon } from '@netlify/neon';

// Only initialize DB connection if DATABASE_URL is available (not during build)
let sql: any = null;

function getDb() {
  if (!sql) {
    sql = neon(); // automatically uses env NETLIFY_DATABASE_URL
  }
  return sql;
}

export default getDb();
