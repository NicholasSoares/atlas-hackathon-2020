const express = require('express');
const router = express.Router();
const globalController = require('../controllers/globalController');
const guessRequired = require('../../middlewares/guessRequired');

router.get('/', globalController.home);
router.get('/sos', globalController.sos);
router.get('/social',  globalController.social);

module.exports = router;
