const { check, validationResult } = require('express-validator');
const appError = require('../../utils/appErrorFactory');

module.exports = [
    check('email').isEmail().trim(),
    async (req, res, next) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            return next();
        }
        next(appError.newThrowError(JSON.stringify(result.array()),422));
    }
];