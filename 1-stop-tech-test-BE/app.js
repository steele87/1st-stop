process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = require('./config').PORT;
const express = require('express');
const app = express();
const morgan = require('morgan');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', apiRouter);

apiRouter.route('*/')
  .get((req, res) => res.status(200).send({status: 'working'}));

app.use('/api/*', (req, res, next) => {
  const err = new Error('Invalid path');
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({error: err.message, status: err.statusCode});
  next();
});

app.listen(PORT, () => { console.log(`listening on ${PORT}...`); });

module.exports = app;