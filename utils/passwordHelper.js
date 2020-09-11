const passwordHelper = require('bcrypt');
const saltRounds = 10;

function passwordEncryptor(plainPassword) {
    return new Promise( (resolve, reject) => {
        passwordHelper.hash(plainPassword.toString(), saltRounds, async function (err, hash) {
            if(err){
                reject(err);
            }
            else{
                resolve(hash);
            }
        });
    });
}

module.exports = {
    compare : (formPassword,databasePassword) => {
        return new Promise( (resolve, reject) => {
            try {
                let result = passwordHelper.compareSync(formPassword.toString(),databasePassword.toString());
                resolve(result);
            }
            catch (e) {
                reject(e);
            }
        });
    },
    encryptPassword : passwordEncryptor,
    generateTempPassword : () => {
        return new Promise( async (resolve, reject) => {
            try {
                let length = 8,
                    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                    retVal = "";
                for (let i = 0, n = charset.length; i < length; ++i) {
                    retVal += charset.charAt(Math.floor(Math.random() * n));
                }
                let newPassword = await passwordEncryptor(retVal.toString());
                resolve({
                    encrypted : newPassword,
                    plain : retVal
                });
            }
            catch (e) {
                reject(e);
            }
        });

    }
};