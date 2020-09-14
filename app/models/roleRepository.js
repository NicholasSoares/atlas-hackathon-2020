const client = require("../../config/db");
const client_transaction = client;
const appError = require('../../utils/appErrorFactory');

module.exports = {
    list: async () => {
        return new Promise(async (resolve, reject) => {
            try{
                let resp = await client.query('select * from roles');

                resolve(resp.rows);
            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    },
    get : async ({role_id}) => {
        return new Promise(async (resolve, reject) => {
            try{
                let resp = await client.query('select * from roles where role_id = $1 and deleted = false', [role_id]);

                resolve(resp.rows);
            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    }
};