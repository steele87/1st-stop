const express = require('express');

const router = express.Router({caseSensitive: true});
const marketingRouter = require('./marketingRouter');

router.use('/marketing_consent', marketingRouter);

router.route('/')
  .get((req, res) => res.status(200).send({status: 'working'}));

router.use('/*', (req, res, next) => {
  const err = new Error('Invalid path');
  err.statusCode = 404;
  next(err);
});

router.use((err, req, res, next) => {
  res.status(err.statusCode).json({error: err.message, status: err.statusCode});
  next();
});

module.exports = router;