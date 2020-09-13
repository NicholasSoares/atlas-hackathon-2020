const donationsRepository = require('../models/institutionsCategoriesRepository');
const paginationHelper = require('../../utils/paginationHelper');

module.exports = {
    create: async (req, res, next) => {
        try {
            await donationsRepository.insert(req.body);
            res.redirect('');
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
            res.redirect('');
        }
        catch (e) {
            next(e);
        }
    },
    pageList: async (req, res, next) => {
        try {
            let donations = await donationsRepository.list({ search: undefined, limit: 1000, offset: 0 });
            res.render('social/donations/list', { donations: donations });
        }
        catch (e) {
            next(e);
        }
    },
    pageCreate: async (req, res, next) => {
        try {
            res.render('social/donations/create');
        }
        catch (e) {
            next(e);
        }
    },
    pageUpdate: async (req, res, next) => {
        try {
            res.render('social/donations/details');
        }
        catch (e) {
            next(e);
        }
    },
};