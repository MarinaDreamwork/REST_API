const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const { getEqualTagName, createNewTag, getTagById, updateTagById, removeTagById, getMultiple, updateNameTagById, updateSortOrderTagById } = require('../models/tag.model');
const { getCurrentUser } = require('../models/user.model');
const { errorServer, errorUnAuthorized } = require('../utils/errors');

const router = express.Router({
  mergeParams: true
});

router
  .route('/')
  .post(auth, 
  check('name', 'Max length is 40 chars').isLength({ max: 40 }), 
  async (req, res) => {
  try {
    const authUserUid = req.user.userid;
    if(authUserUid) {
      const { name, sortorder } = req.body;
      const isSameNameExists = await getEqualTagName(authUserUid, name);
      if(isSameNameExists) {
        return res.status(400).send({
          error: {
            message: 'TAG_NAME_EXISTS',
            code: 400
          }
        });
      }
      // сделать sort опциональным
      const newTag = await createNewTag(authUserUid, name, sortorder);
      res.send({
        id: newTag.id,
        name: newTag.name,
        sortorder: newTag.sortorder
      });
    } else {
      return errorUnAuthorized(res);
    }
  } catch (error) {
    errorServer(res);
  }
  })
  .get(auth, async(req, res, next) => {
    try {
      console.log(req.user);
      const authUserUid = req.user.userid;
      const { page, pageSize } = req.query;
      const filteredParams = Object.keys(req.query).filter(item =>
        item.includes('sortBy')
      );
      console.log(req.query);
      const sortedField = filteredParams.join().replace('sortBy', '').toLowerCase();
      console.log('sorted', sortedField);
      const dataPage = await getMultiple(page, pageSize, authUserUid, sortedField);
      res.json({
        ...dataPage
      });
    } catch (err) {
      console.error(`Error while getting quotes `, err.message);
      next(err);
    }
  });

router
  .route('/:id')
  .get(auth, async (req, res) => {
    try {
      const authUserUid = req.user.userid;
      if(authUserUid) {
        const { id } = req.params;
        const tag = await getTagById(id);
        const user = await getCurrentUser(tag.creator);
        res.send({
          creator: {
            nickname: user.nickname,
            uid: tag.creator
          },
          name: tag.name,
          sortorder: tag.sortorder
        });
      } else {
        return errorUnAuthorized(res);
      }
    } catch(error) {
      errorServer(res);
    }
  })
  .put(auth, async (req, res) => {
    try {
      const authUserUid = req.user.userid;
        const { id } = req.params;
        const { name, sortorder } = req.body;
          let updatedTag;
          if(name && sortorder) {
            updatedTag = await updateTagById(id, req.body);
            console.log('upd', updatedTag);
          } else if(name) {
            updatedTag = await updateNameTagById(id, name);
          } else {
            updatedTag = await updateSortOrderTagById(id, sortorder);
          }       
          if(authUserUid === updatedTag.creator) {
            const user = await getCurrentUser(authUserUid);
            res.send({
              creator: {
                nickname: user.nickname,
                uid: updatedTag.creator
              },
              name: updatedTag.name,
              sortorder: updatedTag.sortorder
          });  
          } else {
            return errorUnAuthorized(res);
          }   
      } catch (error) {
        errorServer(res);
      }
  })
  .delete(auth, async (req, res) => {
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
    } catch (error) {
      errorServer(res);
    }
  })

module.exports = router;