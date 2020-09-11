const { check, validationResult } = require('express-validator');
const appError = require('../../utils/appErrorFactory');

module.exports = [
    check('email').isEmail().trim(),
    check('password').not().isEmpty().trim().isLength({ min: 5 }),
    async (req, res, next) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }
        next(appError.newThrowError(JSON.stringify(result.array()),422));
    }
];