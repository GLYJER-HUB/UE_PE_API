const checkAdminOrMember = (req, res, next) => {
    // Check if user is authenticated and has "admin" or "member" role
    if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'member')) {
        return res.status(403).json({ message: 'Access denied!' });
    }
    next();
};

module.exports = checkAdminOrMember;