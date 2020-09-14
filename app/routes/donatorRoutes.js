const express = require('express');
const router = express.Router();
const donatorController = require('../controllers/donatorController');
const donatorRequired = require('../../middlewares/donatorRequired');
const donationRoutes = require('../routes/donationRoutes');

router.use('/donations', donatorRequired, donationRoutes);
router.get('/', donatorRequired, donatorController.home);

module.exports = router;