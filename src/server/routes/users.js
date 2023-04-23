const { Router } = require('express');

const router = Router();

router.use((req, res, next) => {
  console.log('request made to users route');
  next();
});

router.get('/', (req, res) => {
  res.send(200);
});

module.exports = router;
