const express = require('express');
const path = require('path');
module.exports = {
    staticLoader : (app) => {
        app.use(express.static(path.join(__dirname, '../public')));
        app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
        app.use('/js', express.static(path.join(__dirname,'../node_modules/jquery/dist')));
        app.use('/js', express.static(path.join(__dirname,'../node_modules/@popperjs/core/dist/umd')));
        app.use('/css', express.static(path.join(__dirname,'../node_modules/bootstrap/dist/css')));
        app.use('/', express.static(path.join(__dirname,'../node_modules/datatables/media')));
        app.use('/', express.static(path.join(__dirname,'../node_modules/datatables.net-bs4')));
    }
};