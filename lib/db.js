const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "",
    database: "star-rail-chatroom"
});

module.exports = pool;