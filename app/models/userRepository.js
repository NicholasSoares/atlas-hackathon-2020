const client = require("../../config/db");
const client_transaction = client;
const appError = require('../../utils/appErrorFactory');

module.exports = {
    list : async ({search, limit, offset}) =>{
        return new Promise(async (resolve, reject) => {
            try{
                let resp;

                if (search){
                    resp = await client.query(`SELECT user_id, username, email, cellphone FROM USERS 
                    WHERE
                        (username ILIKE "%$1%" or 
                        email ILIKE "%$1%" or 
                        cellphone ILIKE "%$1%") 
                    and deleted = false
                    LIMIT $2 OFFSET $3`, [search, limit, offset]);
                }
                else{
                    resp = await client.query(`SELECT user_id, username, email, cellphone FROM USERS 
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
    getById : async ({user_id}) =>{
        return new Promise(async (resolve, reject) => {
            try{
                let resp = await client.query('SELECT *  FROM USERS WHERE user_id = $1 and deleted = false', [user_id]);
                resolve(resp.rows[0]);
            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    },
    getByEmail : async ({email}) =>{
        return new Promise(async (resolve, reject) => {
            try{
                let resp = await client.query('SELECT *  FROM USERS WHERE email = $1 and deleted = false', [email]);
                resolve(resp.rows[0]);
            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    },
    insert : async ({role_id, username, email,password, cellphone}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                let resp = await client.query('INSERT into USERS (role_id, username, email,password, cellphone) VALUES ($1,$2,$3,$4,$5) RETURNING user_id', [role_id, username, email,password, cellphone]);
                await client.query('COMMIT');
                console.log(resp)
                resolve(resp.rows[0]);
            } catch (e) {
                await client.query('ROLLBACK');
                reject(appError.newThrowPgError(e));
            } finally {
                client.release();
            }
        });
    },
    update : async ({user_id, role_id, username, email,password, password_temp, cellphone, deleted}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                let resp = await client.query('UPDATE USERS SET role_id  = $1, username = $2, email = $3, password = $4, password_temp = $5, cellphone = $6, deleted = $7 where user_id = $8',
                    [role_id, username, email,password, password_temp, cellphone, deleted,user_id]);
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
    delete : async ({user_id, deleted}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                await client.query('UPDATE USERS SET deleted = $1 where user_id = $2', [deleted,user_id]);
                await client.query("DELETE FROM SESSION WHERE CAST (sess ->> 'user_id' AS INTEGER) = $1", [user_id]);
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