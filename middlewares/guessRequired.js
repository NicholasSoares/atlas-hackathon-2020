module.exports = function(req, res, next) {
    (req.session.user_id)? res.redirect('/') : next();
};