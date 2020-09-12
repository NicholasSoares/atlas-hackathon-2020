const express = require('express');
const router = express.Router();
const globalController = require('../controllers/globalController');
const guessRequired = require('../../middlewares/guessRequired');

router.get('/', guessRequired, globalController.home);

module.exports = router;
