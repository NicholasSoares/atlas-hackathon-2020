const appError = require('../../utils/appErrorFactory');
const donationsRepository = require('../models/donationsRepository');
module.exports = {
    home: async (req, res, next) => {
        try {
            let donations = await donationsRepository.listWithUser({ search: undefined, limit: 1000, offset: 0 });
            res.render('institution_admin/index', {donations});
        } catch (e) {
            next(e);
        }
    },
};