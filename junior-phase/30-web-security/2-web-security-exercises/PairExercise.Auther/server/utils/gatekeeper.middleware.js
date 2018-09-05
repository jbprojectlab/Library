// permission / access control module
const gatekeepers = {};

gatekeepers.loggedIn = (req, res, next) => {
  // gatekeeper logic
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  next();
};

gatekeepers.admin = (req, res, next) => {
  // gatekeeper logic
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  if (!req.user.isAdmin) {
    res.sendStatus(403);
    return;
  }
  next();
};

gatekeepers.sameUserOrAdmin = (req, res, next) => {
  // gatekeeper logic
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  if (req.user.id !== req.requestedUser.id && !req.user.isAdmin) {
    res.sendStatus(403);
    return;
  }
  next();
};

gatekeepers.authorOrAdmin = (req, res, next) => {
  // gatekeeper logic
  if (!req.user) {
    res.sendStatus(401);
    return;
  }
  if (req.story && !req.user.isAdmin && req.story.authorId !== req.user.id) {
    res.sendStatus(403);
    return;
  }
  if (req.body && !req.user.isAdmin && req.body.authorId !== req.user.id) {
    res.sendStatus(403);
    return;
  }
  next();
};

gatekeepers.removeAdminUpdate = (req, res, next) => {
  if (!req.user || !req.user.isAdmin || req.user.id === Number(req.params.id)) {
    delete req.body.isAdmin;
  }
  next();
};

module.exports = gatekeepers;
