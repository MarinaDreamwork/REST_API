const express = require('express');
const router = express.Router({
  mergeParams: true
});

router.get('/', (req, res) => {
  res.end('<h1>Welcome to REST API service Nodejs and Express</h1>');
});

module.exports = router;