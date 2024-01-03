const Pool = require('pg').Pool;

const pool = new Pool({
    user: "kypjcafe_user",
    password: "U0oz7l0SobhipqCBTqiAAVrilQkBF3IU",
    host: "dpg-cmar7a6n7f5s7396d3qg-a.singapore-postgres.render.com",
    port: 5432,
    database: "kypjcafe"
});

module.exports = pool;