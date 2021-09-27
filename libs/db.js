const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sumari$1992",
    database: "fullnext",
  },
});

export default knex;
