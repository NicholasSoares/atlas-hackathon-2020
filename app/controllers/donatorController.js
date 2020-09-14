const appError = require('../../utils/appErrorFactory');
const donationsRepository = require('../models/donationsRepository');
const passwordHelper = require('../../utils/passwordHelper');
const userRepository = require('../models/userRepository');

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
    create: async (req, res, next) => {
        try {
            req.body.password = await passwordHelper.encryptPassword(req.body.password);

            await userRepository.insert(req.body);
            res.redirect('/donator');
        }
        catch (e) {
            next(e);
        }
    },
};