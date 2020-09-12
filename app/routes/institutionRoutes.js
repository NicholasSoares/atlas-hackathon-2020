const express = require('express');
const router = express.Router();
const institutionsController = require('../controllers/institutionsController');
const adminRequired = require('../../middlewares/adminRequired');

router.get('/', adminRequired, institutionsController.pageList);
router.get('/new', adminRequired, institutionsController.pageCreate);
router.post('/new', adminRequired, institutionsController.create);
router.get('/update', adminRequired, institutionsController.pageUpdate);

module.exports = router;
