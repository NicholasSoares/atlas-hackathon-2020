const express = require('express');
const router = express.Router();
const institutionsCategoriesController = require('../controllers/institutionsCategoriesController');
const adminRequired = require('../../middlewares/adminRequired');

router.get('/', adminRequired, institutionsCategoriesController.pageList);

module.exports = router;
