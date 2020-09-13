const client = require("../../config/db");
const client_transaction = client;
const appError = require('../../utils/appErrorFactory');

module.exports = {
    list : async ({search, limit, offset}) =>{
        return new Promise(async (resolve, reject) => {
            try{
                let resp;

                if (search){
                    resp = await client.query(`SELECT * FROM users_donations 
                    WHERE
                        (
                            user_donation_id ILIKE "%$1%" or
                            user_id ILIKE "%$1%" or
                            title ILIKE "%$1%" or
                            description ILIKE "%$1%"
                        )
                    and deleted = false
                    LIMIT $2 OFFSET $3`, [search, limit, offset]);
                }
                else{
                    resp = await client.query(`SELECT * FROM users_donations 
                    WHERE deleted = false
                    LIMIT $1 OFFSET $2`, [limit, offset]);
                }

                resolve(resp.rows);

            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    },
    getById : async ({user_donation_id}) =>{
        return new Promise(async (resolve, reject) => {
            try{
                let resp = await client.query('SELECT *  FROM users_donations WHERE user_donation_id = $1 and deleted = false', [user_donation_id]);
                resolve(resp.rows[0]);
            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    },
    insert : async ({user_donation_id, user_id, title, description}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                let resp = await client.query('INSERT into users_donations (user_donation_id, user_id, title, description) VALUES ($1,$2,$3,$4)', [user_donation_id, user_id, title, description]);
                await client.query('COMMIT');
                resolve(resp);
            } catch (e) {
                await client.query('ROLLBACK');
                reject(appError.newThrowPgError(e));
            } finally {
                client.release();
            }
        });
    },
    update : async ({user_donation_id, title, description, deleted}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                let resp = await client.query('UPDATE users_donations SET title = $1, description = $2, deleted = $3 where user_donation_id = $4',
                    [title, description, deleted, user_donation_id]);
                await client.query('COMMIT');
                resolve(resp);
            } catch (e) {
                await client.query('ROLLBACK');
                reject(appError.newThrowPgError(e));
            } finally {
                client.release();
            }
        });
    },
    delete : async ({user_donation_id, deleted}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                await client.query('UPDATE users_donations SET deleted = $1 where user_donation_id = $2', [deleted, user_donation_id]);
                await client.query('COMMIT');
                resolve(true);
            } catch (e) {
                await client.query('ROLLBACK');
                reject(appError.newThrowPgError(e));
            } finally {
                client.release();
            }
        });
    }
};