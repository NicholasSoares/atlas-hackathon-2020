const donationsRepository = require('../models/donationsRepository');
const paginationHelper = require('../../utils/paginationHelper');

module.exports = {
    create: async (req, res, next) => {
        try {
            req.body.image = req.file.filename;
            req.body.user_id = req.session.user_id;
            await donationsRepository.insert(req.body);
            res.redirect('/donator');
        }
        catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            await donationsRepository.delete(req.body);
            res.redirect('/donator');
        }
        catch (e) {
            next(e);
        }
    },
    pageList: async (req, res, next) => {
        try {
            let donations = await donationsRepository.list({ search: undefined, limit: 1000, offset: 0 });
            res.render('donator/donations/list', { donations: donations });
        }
        catch (e) {
            next(e);
        }
    },
    pageCreate: async (req, res, next) => {
        try {
            res.render('donator/donations/create');
        }
        catch (e) {
            next(e);
        }
    },
    pageUpdate: async (req, res, next) => {
        try {
            res.render('donator/donations/details');
        }
        catch (e) {
            next(e);
        }
    },
};