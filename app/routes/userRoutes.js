const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userUpdateValidator = require('../../middlewares/datavalidators/userUpdateValidator');
const userCreateValidator = require('../../middlewares/datavalidators/userCreateValidator');
const userDeleteValidator = require('../../middlewares/datavalidators/userDeleteValidator');
const loginRequired = require('../../middlewares/loginRequired');
const AdminRequired = require('../../middlewares/adminRequired');

router.get('/', loginRequired, AdminRequired, userController.pageList);
router.get('/new', loginRequired, AdminRequired, userController.pageCreate);
router.post('/new', loginRequired, AdminRequired, userCreateValidator,  userController.create);
router.get('/update', loginRequired, AdminRequired, userController.pageUpdate);
router.post('/update', loginRequired, AdminRequired, userUpdateValidator, userController.update);
router.post('/delete', loginRequired, AdminRequired, userDeleteValidator, userController.delete);

module.exports = router;
