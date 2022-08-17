const express = require('express');
const router = express.Router({
  mergeParams: true
});

router.use('/signin', require('./signin.routes'));
router.use('/login', require('./login.routes'));
router.use('/token', require('./token.routes'));
router.use('/logout', require('./logout.routes'));
router.use('/user', require('./user.routes'));
router.use('/tag', require('./tag.routes'));

module.exports = router;
