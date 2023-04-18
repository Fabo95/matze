const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname: 'localhost', port: 3002 });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.static('public'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use(bodyParser.json());

  // add custom path here
  server.get('/testi', (req, res) => {
    return res.send('123');
  });

  // next js speicifc to handle all incomming requests with requestHandler.
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3002, 'localhost', (err) => {
    if (err) throw err;
    console.log('Ready on http://localhost:3002');
  });
});
