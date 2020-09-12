const limiter = require('../middlewares/rateLimit');
const accessRoutes = require('../app/routes/accessRoutes');
const userRoutes = require('../app/routes/userRoutes');
const globalRoutes = require('../app/routes/globalRoutes');
const adminRoutes = require('../app/routes/adminRoutes');
const institutionRoutes = require('../app/routes/institutionRoutes');
const categoryRoutes = require('../app/routes/categoryRoutes');

module.exports = {
    routesLoader : (app) => {
        app.use('/', limiter, globalRoutes);
        app.use('/access', limiter, accessRoutes);
        app.use('/users', limiter, userRoutes);
        app.use('/admin',  limiter, adminRoutes);
        app.use('/institutions',  limiter, institutionRoutes);
        app.use('/categories',  limiter, categoryRoutes);
    }
};