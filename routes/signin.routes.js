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
  check('email', 'Некорректный email').isEmail(),
  check('password')
    .matches(/\d{1,}/)
    .withMessage('Пароль должен содержать хотя бы одну цифру')
    .bail()
    .matches(/[A-Z]{1,}/)
    .withMessage('Пароль должен содержать хотя бы одну заглавную букву')
    .bail()
    .matches(/[a-z]{1,}/)
    .withMessage('Пароль должен содержать как минимум одну строчную букву')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Минимальная длина пароля - 8 символов'),
  check('nickname', 'Никнэйм должен быть заполнен').notEmpty(),
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password, nickname } = req.body;
    console.log(email, password, nickname);
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
    console.log(hashedPassword);
    const newUser = await createUser({
      email: email,
      password: hashedPassword,
      nickname: nickname
    });
    const tokenInfo = tokenService.generate({ userid: newUser.uid });
    await tokenService.save(newUser.uid, tokenInfo.token);
    res.status(201).send(tokenInfo);
  } catch (error) {
    errorServer(res);
  }
}
]);

module.exports = router;