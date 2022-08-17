const pool = require('../db');
const tokenDB = 'token';

const createToken = (userid, token) => {
  return new Promise( (resolve, reject) => {
    pool.query(`INSERT INTO ${tokenDB} (userid, token) VALUES ($1, $2) RETURNING *`, [userid, token], (error, results) => {
      if(error) {
        reject('error from createUserTable', error);
      }
      resolve(results.rows[0]);
    });
  });
};

const updateToken = (userid, updatedToken) => {
  return new Promise( (resolve, reject) => {
    pool.query(`UPDATE ${tokenDB} SET token = '${updatedToken}' WHERE userid = '${userid}' RETURNING *`, (error, results) => {
      if(error) {
        reject(error.stack);
      }
      resolve(results.rows[0]);
    });
  });
};

const findToken = (data) => {
  const { field, value } = data;
  return new Promise( (resolve, reject) => {
    pool.query(`SELECT * FROM ${tokenDB} WHERE ${field} = $1`, [value], (error, results) => {
      if(error) {
        reject(error.stack);
      }
      resolve(results.rows[0]);
    });
  });
};

const removeToken = (userId) => {
  return new Promise( (resolve, reject) => {
    pool.query(`DELETE FROM ${tokenDB} WHERE userid = '${userId}'`, (error, results) => {
      if(error) {
        reject(error.stack);
      }
      resolve(results.rows[0]);
    });
  });
};

module.exports = {
  createToken,
  updateToken,
  findToken,
  removeToken
};