const logger = require('../services/errorHandler');

module.exports = function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(err.status || 500);
    res.send({menssage : res.locals.message, error : res.locals.error});
    logger.log(err,req);
};