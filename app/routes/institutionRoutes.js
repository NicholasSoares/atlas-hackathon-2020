const express = require('express');
const router = express.Router();
const institutionsController = require('../controllers/institutionsController');
const donationsController = require('../controllers/donationsController');
const adminRequired = require('../../middlewares/adminRequired');
const institutionAdminRequired = require('../../middlewares/institutionAdminRequired');
const multerFileUpload = require('../../middlewares/multerFileUpload');

router.get('/', adminRequired, institutionsController.pageList);
router.get('/new', adminRequired, institutionsController.pageCreate);
router.post('/new', adminRequired, multerFileUpload, institutionsController.create);
router.get('/solicitation', adminRequired, institutionsController.pageSolicitations);
router.get('/update', adminRequired, institutionsController.pageUpdate);
router.post('/delete', adminRequired, institutionsController.delete);
router.post('/approve', adminRequired, institutionsController.approve);
router.post('/reprove', adminRequired, institutionsController.reprove);

router.get('/admin', institutionAdminRequired, donationsController.pageList);

module.exports = router;
