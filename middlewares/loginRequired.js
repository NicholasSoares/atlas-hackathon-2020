module.exports = function(req, res, next) {
    (req.session.user_id)? next() : res.redirect('/access');
};