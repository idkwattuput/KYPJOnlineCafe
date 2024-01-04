const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_CONN,
});

module.exports = pool;
