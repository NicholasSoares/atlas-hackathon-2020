const express = require('express');
const router = express.Router();
const institutionsCategoriesController = require('../controllers/institutionsCategoriesController');
const adminRequired = require('../../middlewares/adminRequired');

router.get('/', adminRequired, institutionsCategoriesController.pageList);
router.get('/new', adminRequired, institutionsCategoriesController.pageCreate);
router.post('/new', adminRequired, institutionsCategoriesController.create);
router.get('/update', adminRequired, institutionsCategoriesController.pageUpdate);

module.exports = router;
