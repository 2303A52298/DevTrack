const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "devtrack",
  password: "password",
  port: 5432
});

module.exports = pool;