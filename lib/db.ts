import postgres from "postgres";

// attaching a fly database uses ipv6 for the host which apparently breaks things
// Only initialize DB connection if DATABASE_URL is available (not during build)
let sql: any = null;

function getDb() {
  if (!sql && process.env.DATABASE_URL) {
    const dbString = process.env.DATABASE_URL;
    const connectionString = dbString.replace(/\[.*]/, "how2fite-db.internal");
    sql = postgres(connectionString);
  }
  return sql;
}

export default getDb();
