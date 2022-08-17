const pool = require('../db');
const tagDB = 'tag';
const helper = require('../helper');
const { getCurrentUser } = require('./user.model');
const checkTags = require('../utils/loop');

//const db = require('./db');
//const config = require('../config');

const createNewTag = (authUserUid, name, sortorder) => {
  return new Promise( (resolve, reject) => {
    pool.query(`INSERT INTO ${tagDB} (creator, name, sortorder) VALUES ('${authUserUid}', '${name}', '${sortorder}') RETURNING *`, (error, results) => {
      if(error) {
        reject('error from getUserTags', error);
      }
      resolve(results.rows[0]);
    });
  });
};

const getUserTags = (userId) => {
  return new Promise( (resolve, reject) => {
    pool.query(`SELECT id, name, sortorder FROM ${tagDB} WHERE creator = '${userId}'`, (error, results) => {
      if(error) {
        reject('error from getUserTags', error);
      }
      resolve(results.rows);
    });
  });
};

const getEqualTagName = (userId, name) => {
  return new Promise( (resolve, reject) => {
    pool.query(`SELECT * FROM ${tagDB} WHERE creator = '${userId}' AND name = '${name}'`, (error, results) => {
      if(error) {
        reject('error from getUserTags', error);
      }
      resolve(results.rows[0]);
    });
  });
};

const getTagById = (tagId) => {
  return new Promise( (resolve, reject) => {
    pool.query(`SELECT * FROM ${tagDB} WHERE id = '${tagId}'`, (error, results) => {
      if(error) {
        reject('error from getUserTags', error);
      }
      console.log('results.rows[0]', results.rows[0]);
      resolve(results.rows[0]);
    });
  });
};

const updateTagById = (tagId, payload) => {
  const { name, sortorder } = payload;
    return new Promise( (resolve, reject) => {
      pool.query(`UPDATE ${tagDB} SET name = '${name}', sortorder = '${sortorder}' WHERE id = '${tagId}' RETURNING *`, (error, results) => {
      if(error) {
        reject('error from getUserTags', error);
      }
      resolve(results.rows[0]);
    });
  });
};

const updateNameTagById = (tagId, name) => {
  return new Promise( (resolve, reject) => {
      pool.query(`UPDATE ${tagDB} SET name = '${name}' WHERE id = '${tagId}' RETURNING *`, (error, results) => {
      if(error) {
        reject('error from getUserTags', error);
      }
      resolve(results.rows[0]);
    });
  });
};

const updateSortOrderTagById = (tagId, sortorder) => {
  return new Promise( (resolve, reject) => {
      pool.query(`UPDATE ${tagDB} SET sortorder = '${sortorder}' WHERE id = '${tagId}' RETURNING *`, (error, results) => {
      if(error) {
        reject('error from getUserTags', error);
      }
      resolve(results.rows[0]);
    });
  });
};

const removeTagById = (tagId) => {
  return new Promise( (resolve, reject) => {
    pool.query(`DELETE FROM ${tagDB} WHERE id = '${tagId}' RETURNING *`, (error, results) => {
      if(error) {
        reject('error from getUserTags', error);
      }
      resolve(results.rows[0]);
    });
  });
};

// const isAllTagsArePresent = (arr, uid) => {
//   console.log(`[${arr}]`);
//   return new Promise( (resolve, reject) => {
//     pool.query(`SELECT DISTINCT id, name, sortorder FROM ${tagDB} WHERE creator = ${uid} AND id = ALL ( ARRAY${arr})`, (error, results) => {
//       if(error) {
//         reject('error from getUserTags', error);
//       }
//       resolve(results.rows[0]);
//     });
//   });
// };

// new Promise((resolve, reject) => {
//       pool.query(`SELECT id, name, sortorder FROM ${tagDB} WHERE creator = '${uid}' AND id = '${id}'`, (error, results) => {
//       if(error) {
//         reject(error.stack);
//       }
//       console.log('res', results.rows[0]);
//       newArr.push(results.rows[0]);
//       resolve(results.rows[0]);
//       });
//     });

const isAllTagsArePresent = async (arr, uid) => {
  const newArr = [];
  for(const id of arr) {
    const resData = await getTagById(id);
    newArr.push(resData);
  };
  console.log('newArr', newArr);
  return checkTags(newArr);
};

async function getMultiple(page, pageSize, uid, field) {
  if(page == undefined) page = 1;
  if(pageSize == undefined) pageSize = 10;
  if(field.length === 0) field = 'id';
  const offset = helper.getPage(page, pageSize);
  const { rows } = await pool.query(
    `SELECT creator, name, sortorder FROM ${tagDB} WHERE creator = '${uid}' ORDER BY ${field} ASC LIMIT ${pageSize} OFFSET ${offset}`
  );
  const allTags = await getUserTags(uid);
  const currentUser = await getCurrentUser(uid);
  const data = helper.emptyOrRows(rows, currentUser);
  const meta = { 
    page,
    pageSize,
    quantity: allTags?.length
  };

  return {
    data,
    meta
  }
};

module.exports = {
  createNewTag,
  getUserTags,
  getEqualTagName,
  getTagById,
  updateTagById,
  updateNameTagById,
  updateSortOrderTagById,
  removeTagById,
  isAllTagsArePresent,
  getMultiple
};