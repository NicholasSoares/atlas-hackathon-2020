const institutionsCategoriesRepository = require('../models/institutionsCategoriesRepository');
const paginationHelper = require('../../utils/paginationHelper');

module.exports = {
    create: async (req, res, next) => {
        try {
            await institutionsCategoriesRepository.insert(req.body);
            res.redirect('/categories');
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
            await institutionsCategoriesRepository.delete(req.body);
            res.redirect('/categories');
        }
        catch (e) {
            next(e);
        }
    },
    pageList: async (req, res, next) => {
        try {
            let institutionsCategories = await institutionsCategoriesRepository.list({ search: undefined, limit: 1000, offset: 0 });
            console.log(institutionsCategories);
            res.render('institutions categories/list', { categories: institutionsCategories });
        }
        catch (e) {
            next(e);
        }
    },
    pageCreate: async (req, res, next) => {
        try {
            res.render('institutions categories/create');
        }
        catch (e) {
            next(e);
        }
    },
    pageUpdate: async (req, res, next) => {
        try {
            res.render('institutions categories/details');
        }
        catch (e) {
            next(e);
        }
    },
};