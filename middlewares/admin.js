module.exports = function(req, res, next) {
    if (req.user.isAdmin) next();
    res.status(403).send("access denied");
}

// 401 Unauthorized
// 403 Forbidden