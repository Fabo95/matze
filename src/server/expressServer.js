const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, hostname: 'localhost', port: 3002 });
const handle = app.getRequestHandler();

const users = [{ name: 'fabian' }, { name: 'kerstin' }, { name: 'matze ' }];

const posts = [{ title: 'My first title' }, { title: 'My last title' }];

app.prepare().then(() => {
  const server = express();

  server.use(express.urlencoded({ extended: false }));

  // route parameter get method route.
  server.get('/users/:name', (req, res) => {
    const { name } = req.params;

    const user = users.find((currentUser) => currentUser.name === name);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send('Not found.');
    }
  });

  // query param get method route.
  server.get('/posts', (req, res) => {
    const { title } = req.query;

    if (title) {
      const post = posts.find((currentPost) => currentPost.title === title);
      if (post) {
        return res.status(200).send(post);
      } else {
        return res.status(404).send('Not found.');
      }
    }

    return res.status(200).send(posts);
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
