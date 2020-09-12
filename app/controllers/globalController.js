const appError = require('../../utils/appErrorFactory');

module.exports = {
	 home : async (req,res,next) => {
	 	try {
	 		res.render('home');
	 	} catch (e) {
            next(e);
        }
    },
};