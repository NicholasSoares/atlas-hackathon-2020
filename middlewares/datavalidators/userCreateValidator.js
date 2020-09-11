const { check, validationResult } = require('express-validator');
const userRepository = require('../../app/models/userRepository');
const appError = require('../../utils/appErrorFactory');

module.exports = [
    check('role_id').isLength({ min: 1 }).not().isEmpty().trim(),
    check('email').isEmail().trim(),
    check('password').isLength({ min: 5 }).not().isEmpty().trim(),
    check('username').isLength({ min: 5 }).not().isEmpty().trim(),
    check('cellphone').isLength({ min: 11 }).not().isEmpty().trim(),
    async (req, res, next) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            if(await userRepository.getByEmail(req.body)){
                next(appError.newThrowError('Email ja Cadastrado',409));
            }
            else {
                next();
            }
        }
        else{
            next(appError.newThrowError(JSON.stringify(result.array()),422));
        }
    }
];