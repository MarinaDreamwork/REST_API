const express = require('express');
const tokenService = require('../services/token.service');
const auth = require('../middleware/auth.middleware');
const { errorServer, errorUnAuthorized } = require('../utils/errors');
const router = express.Router({
  mergeParams: true
});

router.post('/', auth, async (req, res) => {
  try {
    const { token } = req.body;
    const isValidToken = tokenService.validateToken(token);
    const dbToken = await tokenService.findDBToken(token);
    if(!isTokenValid(isValidToken, dbToken)) {
      errorUnAuthorized(res);
    }
    const tokenInfo = tokenService.generate({ userid: isValidToken.userid });
    await tokenService.save(isValidToken.userid, tokenInfo.token );
    res.status(201).send({ ...tokenInfo });
  } catch (error) {
    errorServer(res);
  }
});

function isTokenValid (data, dbToken) {
  return !data || !dbToken || data.userid !== dbToken?.userid?.toString();
};

module.exports = router;