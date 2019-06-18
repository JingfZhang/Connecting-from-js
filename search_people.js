const pq = require("pg");
const settings = require("./settings");

const knex = require("knex")({
  client: "pg",
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  },
});

const name = process.argv[2];

// knex.raw("SELECT to_char(birthdate, 'YYYY-MM-DD') AS dob FROM famous_people WHERE last_name = $1 OR first_name = $1")
knex.select("first_name", "last_name", knex.raw("to_char(birthdate, 'YYYY-MM-DD') AS dob"))
  .from("famous_people")
  .where("first_name", name).orWhere("last_name", name)
  .asCallback(function(err, results) {
    if (err) return console.error(err);
    let count = 1;
    for(let res of results) {
      console.log("-" + count + ": " + res.first_name + " " + res.last_name + ", born \"" + res.dob +"\"");
      count++;
    }
    knex.destroy();
  })

