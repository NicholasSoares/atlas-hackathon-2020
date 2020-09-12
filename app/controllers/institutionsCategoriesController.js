const institutionsCategoriesRepository = require('../models/institutionsCategoriesRepository');
const paginationHelper = require('../../utils/paginationHelper');

module.exports = {
    create : async (req,res,next) => {
        try{
            res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    },
    update : async (req,res,next) => {
        try{
            res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    },
    delete : async (req,res,next) => {
        try{
            await institutionsCategoriesRepository.delete(req.body);
            res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    },
    pageList : async (req,res,next) => {
        try{
            res.render('institutions categories/list');
        }
        catch (e) {
            next(e);
        }
    },
    pageCreate : async (req,res,next) => {
        try{
            res.render('institutions categories/create');
        }
        catch (e) {
            next(e);
        }
    },
    pageUpdate : async (req,res,next) => {
        try{
            res.render('institutions categories/details');
        }
        catch (e) {
            next(e);
        }
    },
};