const userRepository = require('../models/userRepository');
const passwordHelper = require('../../utils/passwordHelper');
const paginationHelper = require('../../utils/paginationHelper');

module.exports = {
    create: async (req, res, next) => {
        try {
            req.body.password = await passwordHelper.encryptPassword(req.body.password);
            await userRepository.insert(req.body);
            res.redirect('/admin/users');
        }
        catch (e) {
            next(e);
        }
    },
    update: async (req, res, next) => {
        try {
            let userData = await userRepository.getByEmail(req.body);
            req.body.password = (req.body.password) ? await passwordHelper.encryptPassword(req.body.password) : userData.password;
            await userRepository.update(req.body);
            res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            await userRepository.delete(req.body);
            res.redirect('/admin/users');
        }
        catch (e) {
            next(e);
        }
    },
    pageList: async (req, res, next) => {
        try {
            let users = await userRepository.list({ search: undefined, limit: 1000, offset: 0 });
            res.render('admin/users/list', { users });
        }
        catch (e) {
            next(e);
        }
    },
    pageCreate: async (req, res, next) => {
        try {
            res.render('admin/users/create');
        }
        catch (e) {
            next(e);
        }
    },
    pageUpdate: async (req, res, next) => {
        try {
            res.render('admin/users/details');
        }
        catch (e) {
            next(e);
        }
    },
};