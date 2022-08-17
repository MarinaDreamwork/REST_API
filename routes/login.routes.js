const express = require('express');
const bcrypt = require('bcryptjs');
const { getUserByEmail, getEmail } = require('../models/user.model');
const tokenService = require('../services/token.service');
const router = express.Router({
  mergeParams: true
});

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await getUserByEmail(email);
    if(!isUserExist) {
      return res.status(400).send({
        error: {
          message: 'EMAIL_NOT_FOUND',
          code: 400
        }
      });
    }
    const isPasswordEqual = await bcrypt.compare(password, isUserExist.password);
    if(!isPasswordEqual) {
      return res.status(400).send({
        error: {
          message: 'INVALID_PASSWORD',
          code: 400
        }
      });
    }
    const tokenInfo = tokenService.generate({ userid: isUserExist.uid });
    console.log('new tokenInfo', tokenInfo);
    await tokenService.save(isUserExist.uid, tokenInfo.token);
    res.status(201).send({
      ...tokenInfo
    });
  } catch(error) {
    res.status(500).send({
      message: 'На сервере произошла ошибка'
    })
  }
});

module.exports = router;
