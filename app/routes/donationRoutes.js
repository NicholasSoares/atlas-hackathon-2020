const express = require('express');
const router = express.Router();
const donationsController = require('../controllers/donationsController');
const donatorRequired = require('../../middlewares/donatorRequired');
const multerFileUpload = require('../../middlewares/multerFileUpload');

router.get('/', donatorRequired, donationsController.pageList);
router.get('/new', donatorRequired, donationsController.pageCreate);
router.post('/new', donatorRequired, multerFileUpload, donationsController.create);
router.get('/update', donatorRequired, donationsController.pageUpdate);
router.post('/delete', donatorRequired, donationsController.delete);

module.exports = router;