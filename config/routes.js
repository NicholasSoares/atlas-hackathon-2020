const limiter = require('../middlewares/rateLimit');
const accessRoutes = require('../app/routes/accessRoutes');

const globalRoutes = require('../app/routes/globalRoutes');
const adminRoutes = require('../app/routes/adminRoutes');

module.exports = {
    routesLoader : (app) => {
        app.use('/', globalRoutes);
        app.use('/access', accessRoutes);
        app.use('/admin',  adminRoutes);
    }
};