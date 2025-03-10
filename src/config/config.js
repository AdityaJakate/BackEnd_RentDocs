const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user:'postgres',
  host: "localhost",
  database:  'rentdocs',
  password: 'newPassword',
  port: 5432,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

module.exports = pool;
