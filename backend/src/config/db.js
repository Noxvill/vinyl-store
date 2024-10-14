require('dotenv').config();
const { Pool } = require('pg');

const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;

const db = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_NAME,
  allowExitOnIdle: true
});

module.exports = {
  db
};
