const User = require("../models/daily");

function isAuthenticated(req, res, next) {
  if (!req.user) return res.redirect("/login");
  else return next();
}

function handleLoggedInUser(req, res, next) {
  if (!req.session.user) {
    res.locals.user = null;
    return next();
  }
  User.findById(req.session.user, (err, user) => {
    req.user = user;
    delete req.user.password;
    res.locals.user = req.user;
    next();
  });
}

module.exports = {
  isAuthenticated,
  handleLoggedInUser,
};
