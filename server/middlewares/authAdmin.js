
const isAdminAuthorization = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    } else {
        res.status(403).json({ message: 'Forbidden: Admins only' });
    }
};

module.exports = isAdminAuthorization;

