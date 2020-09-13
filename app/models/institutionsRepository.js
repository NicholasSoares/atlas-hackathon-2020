const client = require("../../config/db");
const client_transaction = client;
const appError = require('../../utils/appErrorFactory');

module.exports = {
    list : async ({search, limit, offset}) =>{
        return new Promise(async (resolve, reject) => {
            try{
                let resp;

                if (search){
                    resp = await client.query(`SELECT institution_id, institution_category_id, institution_name, image, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao FROM institutions 
                    WHERE
                        (institution_name ILIKE "%$1%" or 
                        endereco ILIKE "%$1%" or 
                        bairro ILIKE "%$1%" or 
                        cep ILIKE "%$1%" or 
                        cidade ILIKE "%$1%" or 
                        telefone ILIKE "%$1%" or 
                        email ILIKE "%$1%" or 
                        cnpj ILIKE "%$1%")
                    and deleted = false and approved = true
                    LIMIT $2 OFFSET $3`, [search, limit, offset]);
                }
                else{
                    resp = await client.query(`SELECT institution_id, institution_category_id, institution_name, image, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao FROM institutions 
                    WHERE deleted = false and approved = true
                    LIMIT $1 OFFSET $2`, [limit, offset]);
                }

                resolve(resp.rows);

            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    },
    getById : async ({institution_id}) =>{
        return new Promise(async (resolve, reject) => {
            try{
                let resp = await client.query('SELECT * FROM institutions WHERE institution_id = $1 and deleted = false and approved = true', [institution_id]);
                resolve(resp.rows[0]);
            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    },
    getByCategory : async ({category_id}) =>{
        return new Promise(async (resolve, reject) => {
            try{

                let resp = await client.query('SELECT * FROM institutions WHERE institution_category_id = $1 and deleted = false and approved = true', [category_id]);
                resolve(resp.rows);
            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    },
    insert : async ({institution_category_id, institution_name, image, endereco, bairro, cep, cidade, telefone, email, cnpj, approved}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                let resp = await client.query('INSERT into institutions (institution_category_id, institution_name, image, endereco, bairro, cep, cidade, telefone, email, cnpj, approved) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',
                 [institution_category_id, institution_name, image, endereco, bairro, cep, cidade, telefone, email, cnpj, approved]);
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
    update : async ({institution_id, institution_category_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, deleted}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                let resp = await client.query('UPDATE institutions SET institution_category_id = $1, institution_name = $2, endereco = $3, bairro = $4, cep = $5, cidade = $6, telefone = $7, email = $8, cnpj = $9, deleted = $10 where institution_id = $11',
                    [institution_category_id, institution_name, endereco, bairro, cep, cidade, telefone, email, cnpj, deleted, institution_id]);
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
    delete : async ({institution_id, deleted}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                await client.query('UPDATE institutions SET deleted = $1 where institution_id = $2', [deleted,institution_id]);
                await client.query('COMMIT');
                resolve(true);
            } catch (e) {
                await client.query('ROLLBACK');
                reject(appError.newThrowPgError(e));
            } finally {
                client.release();
            }
        });
    },
    solicitation : async () =>{
        return new Promise(async (resolve, reject) => {
            try{
                let resp = await client.query(`SELECT institution_id, institution_category_id, institution_name, image, endereco, bairro, cep, cidade, telefone, email, cnpj, descricao FROM institutions 
                    WHERE deleted = false and approved = false`);
                console.log(resp.rows)
                resolve(resp.rows[0]);

            }
            catch (e) {
                reject(appError.newThrowPgError(e));
            }
        });
    },
    approve : async ({institution_id, approved}) =>{
        return new Promise(async (resolve, reject) => {
            let client = await client_transaction.connect();
            try {
                await client.query('BEGIN');
                await client.query('UPDATE institutions SET approved = $1 where institution_id = $2', [approved,institution_id]);
                await client.query('COMMIT');
                resolve(true);
            } catch (e) {
                await client.query('ROLLBACK');
                reject(appError.newThrowPgError(e));
            } finally {
                client.release();
            }
        });
    },

};