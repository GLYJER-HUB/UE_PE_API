const checkAdminOrSuperadmin = (req, res, next) => {
    // Check if user is authenticated and has either "admin" or "superadmin" role
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'superadmin')) {
        return res.status(403).json({ message: 'Access denied!' });
    }
    next();
};

module.exports = checkAdminOrSuperadmin;
