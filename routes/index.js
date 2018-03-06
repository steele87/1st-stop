const express = require('express');

const router = express.Router({caseSensitive: true});
const marketingRouter = require('./marketingRouter');

router.use('/marketing_consent', marketingRouter);

module.exports = router;