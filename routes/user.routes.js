const express = require('express');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth.middleware');
const { getCurrentUser, getUserByEmail, getUserByNickName, updateUserData, removeUser } = require('../models/user.model');
const { getUserTags, getTagById, removeTagById, isAllTagsArePresent } = require('../models/tag.model');
const { errorServer, errorEmailExist, errorNickNameExist, errorUnAuthorized } = require('../utils/errors');
const { check, validationResult } = require('express-validator');
const { removeToken } = require('../models/token.model');
const router = express.Router({
  mergeParams: true
});

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const { userid } = req.user;
      console.log('userid', userid);
      const currentUser = await getCurrentUser(userid);
      console.log('currentuser', currentUser);
      const currentUserTags = await getUserTags(userid);
      console.log('currusertags', currentUserTags);
      res.send({ ...currentUser, tags: currentUserTags });
    } catch (error) {
      errorServer(res);
    }
  })
  .put(auth, [
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
      const authUserUid = req.user.userid;
      if(authUserUid) {
        const { email, password, nickname } = req.body;
        const isEmailExist = await getUserByEmail(email);
        // здесь нужно искать инфу другого пользователя, т.к. авторизованный пользователь может не менять свой email, nickname
        if(isEmailExist && (isEmailExist.uid !== authUserUid)) {
          return errorEmailExist(res);
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const isNicknameExist = await getUserByNickName(nickname);
        if(isNicknameExist && (isNicknameExist.uid !== authUserUid)) {
          return errorNickNameExist(res);
        }
        const updatedUserData = await updateUserData(email, hashedPassword, nickname, authUserUid);
        res.send({
          email: updatedUserData.email,
          nickname: updatedUserData.nickname
        });
      } else {
        return errorUnAuthorized(res);
      }
    } catch (error) {
      errorServer(res);
    }
  }])
  .delete(auth, async (req, res) => {
    try {
      const authUserUid = req.user.userid;
      await removeToken(authUserUid);
      await removeUser(authUserUid);
      res.send(null);
    } catch (error) {
      errorServer(res);
    }
  });

router.post('/tag', auth, async (req, res) => {
  try {
    const authUserUid = req.user.userid;
    const { tags } = req.body; 
    const isAllTagsExists = await isAllTagsArePresent(tags, authUserUid);
    console.log('is', isAllTagsExists);
    res.send({
      tags: isAllTagsExists
    });
  } catch (error) {
    errorServer(res);
  }
});

router.delete('/tag/:id', auth, async (req, res) => {
  try {
    const authUserUid = req.user.userid;
    const { id } = req.params;
    const tag = await getTagById(id);
    if(authUserUid === tag.creator) {
      await removeTagById(id);
      res.send(null);
    } else {
      return errorUnAuthorized(res);
    }
  } catch(error) {
    errorServer(res);
  }
});

router.get('/tag/my', auth, async (req, res) => {
  try {
    const authUserUid = req.user.userid;
    const tags = await getUserTags(authUserUid);
    res.send({
      tags: tags
    });
  } catch(error) {
    errorServer(res);
  }
});

module.exports = router;