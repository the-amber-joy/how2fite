const dotenv = require('dotenv')
const { parse } = require('pg-connection-string')

dotenv.config({ path: '.env.local' })
const dbString = process.env.DATABASE_URL
const connectionString = dbString.replace( /\[.*]/, 'how2fite-db.internal');
const options = parse(connectionString || '')

module.exports = options
