const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2];

client.connect();

client.query("SELECT first_name, last_name, to_char(birthdate, 'YYYY-MM-DD') AS dob FROM famous_people WHERE last_name = $1 OR first_name = $1", [name], (err, res) => {
  let count = 1;
  // console.log(res);
  for (let person of res.rows) {
    console.log("-" + count + ": " + person.first_name + " " + person.last_name + ", born \"" + person.dob + "\"");
    count++;
  }
  client.end();
});
