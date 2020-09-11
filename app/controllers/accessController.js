const userRepository = require('../models/userRepository');
const passwordHelper = require('../../utils/passwordHelper');
const mailerService = require('../../services/mailer');
const mailerTemplates = require('../../config/mailerTemplates');
const appError = require('../../utils/appErrorFactory');

module.exports = {
    login : async (req,res,next) => {
        try{
            let userData = await userRepository.getByEmail(req.body);
            if(userData){
                if(await passwordHelper.compare(req.body.password,userData.password)){
                    req.session.user_id = userData.user_id;
                    req.session.role_id = userData.role_id;
                    res.sendStatus(200);
                }
                else if(userData.password_temp){
                    if(await passwordHelper.compare(req.body.password,userData.password_temp)){
                        userData.password = userData.password_temp;
                        userData.password_temp = undefined;
                        await userRepository.update(userData);

                        req.session.user_id = userData.user_id;
                        req.session.role_id = userData.role_id;
                        res.sendStatus(200);
                    }
                    else{
                        next(appError.newThrowError('Senha Invalida',422));
                    }
                }
                else{
                    next(appError.newThrowError('Senha Invalida',422));
                }
            }
            else {
                next(appError.newThrowError('Email Invalido',422));
            }
        }
        catch (e) {
            next(e);
        }
    },
    logout : async (req,res,next) => {
        try{
            req.session.destroy();
            res.redirect('/');
        }
        catch (e) {
            next(e);
        }
    },
    recovery : async (req,res,next) => {
        try{
            let userData  = await userRepository.getByEmail(req.body);
            if(userData){
                let tempPassword = await passwordHelper.generateTempPassword();
                userData.password_temp = tempPassword.encrypted;
                await userRepository.update(userData);
                await mailerService.send({subject: 'Recuparacao de Acesso', content: mailerTemplates.recovery_password_template({password : tempPassword.plain}), email : userData.email});
                res.sendStatus(200);
            }
            else{
                next(appError.newThrowError('Email Invalido',422));
            }
        }
        catch (e) {
            next(e);
        }
    },
    loginPage : async (req,res,next) => {
        try{
            res.render('access/login');
        }
        catch (e) {
            next(e);
        }
    },
    recoveryPage : async (req,res,next) => {
        try{
            res.render('access/recovery');
        }
        catch (e) {
            next(e);
        }
    },
};