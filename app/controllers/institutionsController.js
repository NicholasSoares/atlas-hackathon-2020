const institutionsRepository = require('../models/institutionsRepository');
const userRepository = require('../models/userRepository');
const institutionsCategoriesRepository = require('../models/institutionsCategoriesRepository');
const passwordHelper = require('../../utils/passwordHelper');
const paginationHelper = require('../../utils/paginationHelper');

module.exports = {
    create: async (req, res, next) => {
        try {

            let tempPassword = await passwordHelper.generateTempPassword();
            console.log(tempPassword.plain);
            let user = await userRepository.insert({
                role_id: 2,
                username: req.body.institution_name,
                email:  req.body.email,
                password: tempPassword.encrypted,
                cellphone: req.body.telefone,
            });
            req.body.image = req.file.filename;
            req.body.approved = true;
            req.body.user_id = user.user_id;
            await institutionsRepository.insert(req.body);
            res.redirect('/admin/institutions');
        }
        catch (e) {
            next(e);
        }
    },
    create_solicitation: async (req, res, next) => {
        try {
            let tempPassword = await passwordHelper.generateTempPassword();
            console.log(tempPassword);
            let user = await userRepository.insert({
                role_id: 2,
                username: req.body.institution_name,
                email:  req.body.email,
                password: tempPassword.encrypted,
                cellphone: req.body.telefone,
            });
            console.log(user);
            req.body.image = req.file.filename;
            req.body.approved = false;
            req.body.user_id = user.user_id;
            await institutionsRepository.insert(req.body);
            res.redirect('/');
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
            res.redirect('/admin/institutions');
        }
        catch (e) {
            next(e);
        }
    },
    approve : async (req, res, next) => {
        try {
            await institutionsRepository.approve(req.body);
            res.redirect('/admin/institutions/solicitation');
        }
        catch (e) {
            next(e);
        }
    },
    reprove : async (req, res, next) => {
        try {
            await institutionsRepository.delete(req.body);
            res.redirect('/admin/institutions/solicitation');
        }
        catch (e) {
            next(e);
        }
    },
    pageList: async (req, res, next) => {
        try {
            let institutions = await institutionsRepository.list({ search: undefined, limit: 1000, offset: 0 });
            res.render('admin/institutions/list', { institutions });
        }
        catch (e) {
            next(e);
        }
    },
    pageCreate: async (req, res, next) => {
        try {
            let institutionsCategories = await institutionsCategoriesRepository.list({ search: undefined, limit: 1000, offset: 0 });
            res.render('admin/institutions/create', {categories : institutionsCategories});
        }
        catch (e) {
            next(e);
        }
    },
    pageUpdate: async (req, res, next) => {
        try {
            res.render('admin/institutions/details');
        }
        catch (e) {
            next(e);
        }
    },
    pageSolicitations: async (req, res, next) => {
        try {
            let solicitation = await institutionsRepository.solicitation();
            res.render('admin/institutions/solicitations', { solicitation });
        }
        catch (e) {
            next(e);
        }
    },
};