module.exports = function (req, res, next) {
    if (req.session.user_id) {
        if (req.session.role_id === 0) {
            res.redirect('/admin');
        }
        if (req.session.role_id === 1) {
            res.redirect('/donator');
        }
        if (req.session.role_id === 2) {
            res.redirect('/institution-admin');
        }
    } else {
        next();
    }
};