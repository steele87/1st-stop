const express = require('express');
const router = express.Router();
const updateMarketing = require('../controllers/marketing');

router.route('/')
  .put(updateMarketing);

module.exports = router;