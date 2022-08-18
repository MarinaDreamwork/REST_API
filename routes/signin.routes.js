const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { errorServer, errorEmailExist } = require('../utils/errors');
const tokenService = require('../services/token.service');
const { createUser, getUserByEmail, getUserByNickName } = require('../models/user.model');

const router = express.Router({
  mergeParams: true
});

router.post('/', [
  check('email', 'Email format is not correct').isEmail(),
  check('password')
    .matches(/\d{1,}/)
    .withMessage('Password should have at least one number')
    .bail()
    .matches(/[A-Z]{1,}/)
    .withMessage('Password should have at least one uppercase letter')
    .bail()
    .matches(/[a-z]{1,}/)
    .withMessage('Password should have at least one lowercase letter')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Min password length is 8 chars'),
  check('nickname', 'Nickname should not be empty').notEmpty(),
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password, nickname } = req.body;
    const isUserExist = await getUserByEmail(email);
    console.log('isExist', isUserExist);
    if(isUserExist) {
      return errorEmailExist(res);
    }
    const isSameNickname = await getUserByNickName(nickname);
    if(isSameNickname) {
      return res.status(400).send({
        error: {
          message: 'NICKNAME_EXISTS',
          code: 400
        }
      })
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await createUser({
      email: email,
      password: hashedPassword,
      nickname: nickname
    });
    console.log('newUser', newUser);
    const tokenInfo = tokenService.generate({ userid: newUser.uid });
    await tokenService.save(newUser.uid, tokenInfo.token);
    res.status(201).send(tokenInfo);
  } catch (error) {
    errorServer(res);
  }
}
]);

module.exports = router;