const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();

const usersRouter = require('./routes/users');

app.use(
  cors({
    // If the requests come from another origin we need this to set the cookies correctly.
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(
  session({
    saveUninitialized: false,
    secret: 'My Secret',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('sessionID', req.sessionID);
  console.log('SESSION', req.session);

  if (username && password) {
    if (req.session.authenticated) {
      console.log('RAN AUTHENTICATED');
      res.send(req.session);
    } else if (password === '123') {
      console.log('RAN LOGIN');
      req.session.authenticated = true;
      req.session.user = {
        password,
        username,
      };

      res.json(req.session);
    } else res.status(403).json({ msg: 'Not valid.' });
  } else res.status(403).json({ msg: 'Not valid.' });
});

app.listen(8080, 'localhost', (err) => {
  if (err) throw err;

  console.log('Ready on http://localhost:8080');
});
