const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "U0oz7l0SobhipqCBTqiAAVrilQkBF3IU",
    host: "localhost",
    port: 5432,
    database: "kypjcafe"
});

module.exports = pool;