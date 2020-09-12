const institutionsRepository = require('../models/institutionsRepository');
const paginationHelper = require('../../utils/paginationHelper');

module.exports = {
    create: async (req, res, next) => {
        try {
            await institutionsRepository.insert(req.body);
            res.redirect('/institutions');
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
            await institutionsRepository.delete(req.body);
            res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    },
    pageList: async (req, res, next) => {
        try {
            let institutions = await institutionsRepository.list({ search: undefined, limit: 1000, offset: 0 });
            console.log(institutions);
            res.render('institutions/list', { institutions });
        }
        catch (e) {
            next(e);
        }
    },
    pageCreate: async (req, res, next) => {
        try {
            res.render('institutions/create');
        }
        catch (e) {
            next(e);
        }
    },
    pageUpdate: async (req, res, next) => {
        try {
            res.render('institutions/details');
        }
        catch (e) {
            next(e);
        }
    },
};