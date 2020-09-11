const { check, validationResult } = require('express-validator');
const userRepository = require('../../app/models/userRepository');
const appError = require('../../utils/appErrorFactory');

module.exports = [
    check('user_id').not().isEmpty().trim().isLength({ min: 1 }),
    async (req, res, next) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            if(await userRepository.getById(req.body)){
                next();
            }
            else {
                next(appError.newThrowError('Usuario invalido',422));
            }
        }
        else{
            next(appError.newThrowError(JSON.stringify(result.array()),422));
        }
    }
];