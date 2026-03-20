import postgres from "postgres";

// attaching a fly database uses ipv6 for the host which apparently breaks things
// Only initialize DB connection if DATABASE_URL is available (not during build)
let sql: any = null;

function getDb() {
  if (!sql && process.env.NETLIFY_DATABASE_URL) {
    const dbString = process.env.NETLIFY_DATABASE_URL;
    sql = postgres(dbString);
  }
  return sql;
}

export default getDb();
