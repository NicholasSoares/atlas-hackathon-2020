const express = require('express');
const router = express.Router();
const institutionAdminController = require('../controllers/institutionAdminController');
const institutionAdminRequired = require('../../middlewares/institutionAdminRequired');


router.get('/', institutionAdminRequired, institutionAdminController.home);

module.exports = router;