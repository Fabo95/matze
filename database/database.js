const mySql = require('mysql2');

module.exports = mySql.createConnection({
  database: 'interval_app',
  // If the app is started in the same network as the mysql container this must be the container name of mysql. Otherwise, its localhost.
  host: 'localhost',
  password: 'password',
  // If the app is started in the same network as the mysql container this must be the container port of mysql. Otherwise, it's the docker host port.
  port: 8081,
  user: 'root',
});
