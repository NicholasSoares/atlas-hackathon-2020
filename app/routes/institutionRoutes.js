const express = require('express');
const router = express.Router();
const institutionsController = require('../controllers/institutionsController');
const adminRequired = require('../../middlewares/adminRequired');

router.get('/', adminRequired, institutionsController.pageList);

module.exports = router;
