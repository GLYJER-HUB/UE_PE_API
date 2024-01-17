const checkUserRole = (req, res, next) => {
  // Define an array of allowed roles
  const allowedRoles = ["admin", "member", "superadmin"];

  // Check if user is authenticated and has an allowed role
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Accès refusé !" });
  }

  next();
};

module.exports = checkUserRole;
