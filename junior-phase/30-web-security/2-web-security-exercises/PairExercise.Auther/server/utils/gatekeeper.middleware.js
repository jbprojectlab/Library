// permission / access control module
const gatekeepers = {};

gatekeepers.sameUserOrAdmin = (req, res, next) => {
  // gatekeeper logic
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  if (req.user.id !== Number(req.params.id) && !req.user.isAdmin) {
    res.sendStatus(403);
    return;
  }
  next();
};

module.exports = gatekeepers;
