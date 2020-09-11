const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');
const loginValidator = require('../../middlewares/datavalidators/loginValidator');
const recoveryValidator = require('../../middlewares/datavalidators/recoveryValidator');
const guessRequired = require('../../middlewares/guessRequired');
const loginRequired = require('../../middlewares/loginRequired');

router.get('/', guessRequired, accessController.loginPage);
router.post('/', guessRequired, loginValidator, accessController.login);
router.get('/recovery', guessRequired, accessController.recoveryPage);
router.post('/recovery', guessRequired, recoveryValidator, accessController.recovery);
router.get('/logout', loginRequired, accessController.logout);

module.exports = router;
