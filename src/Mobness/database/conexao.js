// const knex = require("knex")({
//     client: "mysql2",
//     version: "8.0",
//     connection: {
//         host: "mysql669.umbler.com",
//         port: 41890,
//         user: "gs_aberturas",
//         password: "horusdev2020",
//         database: "aberturas",
//     },
// });

const knex = require("knex")({
    client: "mysql2",
    version: "8.0",
    connection: {
        host: "mysql669.umbler.com",
        port: 41890,
        user: "mobness_st",
        password: "mobness_tcc",
        database: "mobness",
    },
});


module.exports = knex;