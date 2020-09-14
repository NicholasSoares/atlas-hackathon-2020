const limiter = require('../middlewares/rateLimit');
const accessRoutes = require('../app/routes/accessRoutes');
const globalRoutes = require('../app/routes/globalRoutes');
const adminRoutes = require('../app/routes/adminRoutes');
const donatorRoutes = require('../app/routes/donatorRoutes');
const institutionAdminRoutes = require('../app/routes/institutionAdminRoutes');

module.exports = {
    routesLoader : (app) => {
        app.use('/', limiter, globalRoutes);
        app.use('/access', limiter, accessRoutes);
        app.use('/admin',  limiter, adminRoutes);
        app.use('/donator', limiter, donatorRoutes);
        app.use('/institution-admin', limiter, institutionAdminRoutes);
    }
};