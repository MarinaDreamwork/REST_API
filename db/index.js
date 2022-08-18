const chalk = require("chalk");
const { Pool } = require('pg');

const dbConfig = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
};

const pool = new Pool(dbConfig);

module.exports = pool;
