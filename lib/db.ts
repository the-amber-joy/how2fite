import postgres from 'postgres'

// attaching a fly database uses ipv6 for the host which apparently breaks things
const dbString = process.env.DATABASE_URL as string
const connectionString = dbString.replace( /\[.*]/, 'how2fite-db.internal');

const sql = postgres(connectionString)

export default sql
