const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const institutionRoutes = require('./institutionRoutes');
const categoryRoutes = require('./categoryRoutes');
const adminController = require('../controllers/adminController');
const adminRequired = require('../../middlewares/adminRequired');

router.use('/users', adminRequired, userRoutes);
router.use('/institutions',  adminRequired, institutionRoutes);
router.use('/categories',  adminRequired, categoryRoutes);
router.get('/', adminRequired, adminController.index);

module.exports = router;
