const limiter = require('../middlewares/rateLimit');
const accessRoutes = require('../app/routes/accessRoutes');
const userRoutes = require('../app/routes/userRoutes');

module.exports = {
        routesLoader : (app) => {
            app.use('/access', limiter, accessRoutes);
            app.use('/users', limiter, userRoutes);
        }
    };