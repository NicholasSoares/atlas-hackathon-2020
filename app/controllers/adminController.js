const appError = require('../../utils/appErrorFactory');

module.exports = {
	 index : async (req,res,next) => {
	 	try {
	 		res.render('admin/index');
	 	} catch (e) {
            next(e);
        }
    },
};