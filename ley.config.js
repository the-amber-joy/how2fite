const dotenv = require('dotenv')
const { parse } = require('pg-connection-string')

dotenv.config({ path: '.env.local' })
const dbString = process.env.NETLIFY_DATABASE_URL
const options = parse(dbString || '')

module.exports = options
