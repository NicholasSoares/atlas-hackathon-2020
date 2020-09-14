const express = require('express');
const router = express.Router();
const donatorController = require('../controllers/donatorController');
const userCreateValidator = require('../../middlewares/datavalidators/userCreateValidator');
const donatorRequired = require('../../middlewares/donatorRequired');
const donationRoutes = require('../routes/donationRoutes');

router.use('/donations', donatorRequired, donationRoutes);
router.get('/', donatorRequired, donatorController.home);
router.post('/new', userCreateValidator, donatorController.create);

module.exports = router;