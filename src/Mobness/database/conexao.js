const knex = require("knex")({
    client: "mysql2",
    version: "8.0",
    connection: {
        host: "mysql741.umbler.com",
        port: 41890,
        user: "usermobness",
        password: "tccmobness",
        database: "pmobness",
    },
});


module.exports = knex;