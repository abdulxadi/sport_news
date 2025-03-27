const {Pool} = require("pg")
<<<<<<< HEAD

const config = require('config');

const pool = new Pool({
  host: config.get("db_host"),
  user: config.get("db_username"),
  password: config.get("db_password"),
  database: config.get("db_name"),
  password: config.get("db_password"),
  port: config.get("db_port")
});

module.exports= pool
=======
const config = require('config');

const pool = new Pool({
    host: config.get("db_host"),
    user: config.get("db_username"),
    password: config.get("db_password"),
    port: config.get("db_port"),
    database: config.get("db_name"),
})

module.exports = pool
>>>>>>> 8f84cca (first commit)
