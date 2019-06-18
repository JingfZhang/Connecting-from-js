const pg = require("pg");
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
const firstName = process.argv[2];
const lastName = process.argv[3];
const dob = process.argv[4];


knex.insert({first_name: firstName, last_name: lastName, birthdate: dob}).into("famous_people")
  .then(function() {console.log("inserted");})
  .catch(function(err) {console.log(err); throw err})
  .finally(function() {knex.destroy()})