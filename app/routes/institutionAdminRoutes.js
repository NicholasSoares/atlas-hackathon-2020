const express = require('express');
const router = express.Router();
const institutionAdminController = require('../controllers/institutionAdminController');
const institutionAdminRequired = require('../../middlewares/institutionAdminRequired');
const institutionsController = require('../controllers/institutionsController');
const multerFileUpload = require('../../middlewares/multerFileUpload');

router.get('/', institutionAdminRequired, institutionAdminController.home);
router.post('/new', multerFileUpload, institutionsController.create_solicitation);

module.exports = router;