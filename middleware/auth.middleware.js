const tokenService = require("../services/token.service");
const { errorUnAuthorized } = require("../utils/errors");

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    return next();
  } 
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log('token', token);
    if(!token) {
      return errorUnAuthorized(res);
    }
    const authInfo = tokenService.validateToken(token);
    console.log('authInfo', authInfo);
    if(!authInfo) {
      return errorUnAuthorized(res);
    }
    
    req.user = authInfo;
    console.log('req.user', req.user);
    next();
  } catch (error) {
    errorUnAuthorized(res);
  }
};