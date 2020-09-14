const limiter = require('../middlewares/rateLimit');
const accessRoutes = require('../app/routes/accessRoutes');
const globalRoutes = require('../app/routes/globalRoutes');
const adminRoutes = require('../app/routes/adminRoutes');
const donatorRoutes = require('../app/routes/donatorRoutes');
const institutionAdminRoutes = require('../app/routes/institutionAdminRoutes');

module.exports = {
    routesLoader : (app) => {
        app.use('/', globalRoutes);
        app.use('/access', accessRoutes);
        app.use('/admin',  adminRoutes);
        app.use('/donator', donatorRoutes);
        app.use('/institution-admin', institutionAdminRoutes);
    }
};