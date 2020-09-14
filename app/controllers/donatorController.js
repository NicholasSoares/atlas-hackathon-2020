const appError = require('../../utils/appErrorFactory');
const donationsRepository = require('../models/donationsRepository');
module.exports = {
    home: async (req, res, next) => {
        try {
            console.log(req);
            let donations = await donationsRepository.getByUser({ user_id: req.session.user_id});
            res.render('donator/index', {donations});
        } catch (e) {
            next(e);
        }
    },
};