var {UserModel} = require('./../../databases/models/UserModel');
var authendicate = (req, res, next) => {
  var token = req.header('x-auth');
  UserModel.getUserbyToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};
module.exports = {authendicate};
