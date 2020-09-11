const { check, validationResult } = require('express-validator');
const userRepository = require('../../app/models/userRepository');
const appError = require('../../utils/appErrorFactory');

module.exports = [
    check('user_id').not().isEmpty().trim().isLength({ min: 1 }),
    check('role_id').not().isEmpty().trim().isLength({ min: 1 }),
    check('email').isEmail().trim(),
    check('username').not().isEmpty().trim().isLength({ min: 5 }),
    check('cellphone').not().isEmpty().trim().isLength({ min: 11 }),
    check('password').optional().not().isEmpty().trim().isLength({ min: 5 }),
    async (req, res, next) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            let dbUserInfo = await userRepository.getById(req.body);
            if(dbUserInfo){
                let emailDuplicated = await userRepository.getByEmail(req.body);
                if(!emailDuplicated || emailDuplicated.user_id === dbUserInfo.user_id){
                    next();
                }
                else {
                    next(appError.newThrowError('Email ja Cadastrado',409));
                }
            }
            else {
                next(appError.newThrowError('Usuario nao encontrado',422));
            }
        }
        else{
            next(appError.newThrowError(JSON.stringify(result.array()),422));
        }
    }
];