process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = require('./config').PORT;
const express = require('express');
const app = express();
const morgan = require('morgan');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.listen(PORT, () => { console.log(`listening on ${PORT}...`); });

module.exports = app;