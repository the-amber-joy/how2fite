// const dotenv = require('dotenv')
const { parse } = require('pg-connection-string')

// dotenv.config({ path: '.env.local' })
// attaching a fly database uses ipv6 for the host which apparently breaks things
const dbString = process.env.DATABASE_URL;
const connectionString = dbString.replace( /\[.*]/, 'how2fite-db.internal');

const options = parse(connectionString || '')

module.exports = options
