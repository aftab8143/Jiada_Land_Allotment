// Factory that returns middleware allowing only the listed groups.
// Accepts numeric group IDs (see constants/roles.js — preferred, immutable) or
// legacy group_name strings for routes not yet migrated.
// Usage: router.get('/route', authMiddleware, allowRoles(ROLES.SYSTEM_ADMIN), handler)
const allowRoles = (...roles) => (req, res, next) => {
  if (!req.user || !(roles.includes(req.user.group_id) || roles.includes(req.user.group_name))) {
    return res.status(403).json({ message: 'Access denied: insufficient permissions' });
  }
  next();
};

export default allowRoles;
