const express = require('express');
const { errorUnAuthorized, errorServer } = require('../utils/errors');
const auth = require('../middleware/auth.middleware');
const { removeToken } = require('../models/token.model');

const router = express.Router({
  mergeParams: true
});

router.post('/', auth, async(req, res) => {
  try {
    const authUserUid = req.user.userid;
    if(authUserUid) {
      await removeToken(authUserUid);
      res.send(null);
    } else {
      return errorUnAuthorized(res);
    }
  } catch (error) {
    errorServer(res);
  }
});

module.exports = router;