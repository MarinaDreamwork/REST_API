const tokenService = require("../services/token.service");
const { errorUnAuthorized } = require("../utils/errors");

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    return next();
  } 
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      return errorUnAuthorized(res);
    }
    const authInfo = tokenService.validateToken(token);
    if(!authInfo) {
      return errorUnAuthorized(res);
    }
    req.user = authInfo;
    next();
  } catch (error) {
    errorUnAuthorized(res);
  }
};