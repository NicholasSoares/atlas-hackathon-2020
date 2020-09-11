const nodemailer = require("nodemailer");
const mailer_cfg = require('../config/mailerSettings');
const mailerTransporter = nodemailer.createTransport(mailer_cfg);

function mailDispatcher({subject,content,email}){
    return new Promise(async (resolve, reject) => {
        try {
            mailerTransporter.verify(function(error, success) {
                if (error) {
                    reject(error);

                } else {
                    let emailBodyContent = {
                        from:  mailer_cfg.auth.user,
                        to: email,
                        subject: (subject)? subject.toString() : '',
                        html: (content)? content.toString() : ''
                    };

                    mailerTransporter.sendMail(emailBodyContent, function(error){
                        (error) ? reject(error) : resolve(true);
                    });

                }
              });
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    send: async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                await mailDispatcher(data);
                resolve(true)
            } catch (e) {
                reject(e)
            }
        });
    }
};