const express = require('express');
const router = express.Router();
const updateMarketing = require('../controllers/marketing');

router.route('/:user_id')
  .put(updateMarketing);

module.exports = router;