const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminRequired = require('../../middlewares/adminRequired');

router.get('/', adminRequired, adminController.index);

module.exports = router;
