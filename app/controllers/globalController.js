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
};