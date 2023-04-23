const mySql = require('mysql2');

module.exports = mySql.createConnection({
  database: 'intervalApp',
  host: 'localhost',
  password: 'password',
  user: 'fabian',
});
