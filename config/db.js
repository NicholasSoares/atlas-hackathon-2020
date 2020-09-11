const connectionString = 'postgresql://postgres:123456@localhost:5432/ATLASAPP';
const {Pool} = require('pg');
const pool = new Pool({
    connectionString: connectionString,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle clients', err);
});

module.exports = pool;