const express = require('express');
const router = express.Router();
const institutionsController = require('../controllers/institutionsController');
const adminRequired = require('../../middlewares/adminRequired');
const multerFileUpload = require('../../middlewares/multerFileUpload');

router.get('/', adminRequired, institutionsController.pageList);
router.get('/new', adminRequired, institutionsController.pageCreate);
router.post('/new', adminRequired, multerFileUpload, institutionsController.create);
router.get('/solicitation', adminRequired, institutionsController.pageSolicitations);
router.post('/solicitation', multerFileUpload, institutionsController.create_solicitation);
router.get('/update', adminRequired, institutionsController.pageUpdate);
router.post('/delete', adminRequired, institutionsController.delete);
router.post('/approve', adminRequired, institutionsController.approve);
router.post('/reprove', adminRequired, institutionsController.reprove);

module.exports = router;
