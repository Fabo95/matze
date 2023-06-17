const express = require('express');
const next = require('next');
const session = require('express-session');
const cors = require('cors');

const intervalsRouter = require('./routes/intervals');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
    cors({
      // We need this to set the cookies correctly if the requests come from another origin.
      credentials: true,
      origin: 'http://localhost:3000',
    })
  );
  server.use(
    session({
      saveUninitialized: false,
      secret: 'My Secret',
    })
  );
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  // Define your API endpoints and other server routes here
  server.use('/intervals', intervalsRouter);

  // Default catch-all handler for Next.js requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
