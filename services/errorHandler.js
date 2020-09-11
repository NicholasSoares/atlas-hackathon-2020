const winston = require('winston');
const settings = require('../config/winston');
const logger = winston.createLogger(settings);
logger.emitErrs = false;

module.exports = {
    log : ({status, message},{path}) =>{
        if(status !== 404){
            logger.error(`${new Date()} | Status : ${status} | Menssage : ${message} | Route : ${path}`);
        }
    }
};