const limiter = require('../middlewares/rateLimit');
const accessRoutes = require('../app/routes/accessRoutes');
const userRoutes = require('../app/routes/userRoutes');
const globalRoutes = require('../app/routes/globalRoutes');

module.exports = {
        routesLoader : (app) => {
        	app.use('/', limiter, globalRoutes);
            app.use('/login', limiter, accessRoutes);
            app.use('/users', limiter, userRoutes);
        }
    };