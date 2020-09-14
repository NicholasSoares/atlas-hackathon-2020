module.exports = function(req, res, next) {
    (req.session.role_id === 1 )? next() : res.redirect('/access');
};