const secretKey = "5577f75aef52a9db3c722a29c660b4c8";
const dbPool = require('./db');
const session = require('express-session');

module.exports = {
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
    store : new (require('connect-pg-simple')(session))({
        pool : dbPool,
    })
};