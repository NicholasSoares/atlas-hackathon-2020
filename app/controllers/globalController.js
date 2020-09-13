const institutionsRepository = require('../models/institutionsRepository');
const institutionsCategoriesRepository = require('../models/institutionsCategoriesRepository');
const appError = require('../../utils/appErrorFactory');

module.exports = {
	 home : async (req,res,next) => {
	 	try {
	 		res.render('home');
	 	} catch (e) {
            next(e);
        }
    },
	sos : async (req,res,next) => {
		try {
			res.render('sos/index');
		} catch (e) {
			next(e);
		}
	},
	social : async (req,res,next) => {
		try {
			let institutionsCategories = await institutionsCategoriesRepository.list({ search: undefined, limit: 1000, offset: 0 });
			let institutions;
			if(! req.query.category || req.query.category == 0){
				institutions = await institutionsRepository.list({ search: undefined, limit: 1000, offset: 0 });
			} else {
				institutions = await institutionsRepository.getByCategory({ category_id: req.query.category });
			}

			console.log(institutions);

			res.render('social/index', { institutions: institutions, categories: institutionsCategories});
		} catch (e) {
			next(e);
		}
	},
	oneSocial : async (req,res,next) => {
		try {
			let institutionsCategories = await institutionsCategoriesRepository.list({ search: undefined, limit: 1000, offset: 0 });
			let institution = await institutionsRepository.getById({institution_id: req.params.institutionId})
			console.log(institution);
			res.render('social/detalhes', { institution: institution, categories: institutionsCategories});
		} catch (e) {
			next(e);
		}
	},
	cadastroPage : async (req,res,next) => {
		try {
			let institutionsCategories = await institutionsCategoriesRepository.list({ search: undefined, limit: 1000, offset: 0 });
			res.render('cadastro', {categories :institutionsCategories});
		} catch (e) {
			next(e);
		}
	},
};