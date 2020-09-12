const client = require("../../config/db");
const client_transaction = client;
const appError = require('../../utils/appErrorFactory');

module.exports = {
    list : async ({search, limit, offset}) =>{
        return new Promise(async (resolve, reject) => {
            try{
                let resp;

                if (search){
                    resp = await client.query(`SELECT institution_category_id, institution_category_name FROM institutions_categories 
                    WHERE
                        (institution_category_name ILIKE "%$1%")
                    and deleted = false
                    LIMIT $2 OFFSET $3`, [search, limit, offset]);
                }
                else{
                    resp = await client.query(`SELECT institution_category_id, institution_category_name FROM institutions_categories 
                    WHERE and deleted = false
                    LIMIT $1 OFFSET $2`, [limit, offset]);
                }

                resolve(resp.rows[0]);

            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    },
    getById : async ({institution_category_id}) =>{
        return new Promise(async (resolve, reject) => {
            try{
                let resp = await client.query('SELECT *  FROM institutions_categories WHERE institution_category_id = $1 and deleted = false', [institution_category_id]);
                resolve(resp.rows[0]);
            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    },
    insert : async ({institution_category_name}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                let resp = await client.query('INSERT into institutions_categories (institution_category_name) VALUES ($1)', [institution_category_name]);
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
    update : async ({institution_category_id, institution_category_name, deleted}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                let resp = await client.query('UPDATE institutions_categories SET institution_category_name = $1, deleted = $2 where institution_category_id = $3',
                    [institution_category_name, deleted, institution_category_id]);
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
    delete : async ({institution_category_id, deleted}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                await client.query('UPDATE institutions_categories SET deleted = $1 where institution_category_id = $2', [deleted, institution_category_id]);
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