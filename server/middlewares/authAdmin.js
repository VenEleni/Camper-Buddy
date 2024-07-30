
const isAdminAuthorization = (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = isAdminAuthorization;

