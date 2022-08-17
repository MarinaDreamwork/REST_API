const pool = require('../db');
const userDB = 'users';

const createUser = (payload) => { 
  return new Promise(function(resolve, reject) {
    const { email, password, nickname } = payload;
    pool.query(`INSERT INTO ${userDB} (email, password, nickname) VALUES ('${email}', '${password}', '${nickname}') RETURNING *`, (error, results) => {
      if (error) {
        reject(error);
      }
      console.log(`new user was added: ${results.rows[0]}`);
      resolve(results.rows[0]);
    });
  });
};

const getUserByEmail = (email) => {
  return new Promise( (resolve, reject) => {
    pool.query(`SELECT * FROM ${userDB} WHERE email = '${email}'`, (error, results) => {
      if(error) {
        console.log('error', error);
        reject(error.stack);
      }
      console.log(results);
      resolve(results?.rows[0]);
    });
  });
};

const getUserByNickName = (nickname) => {
  return new Promise( (resolve, reject) => {
    pool.query(`SELECT * FROM ${userDB} WHERE nickname = '${nickname}'`, (error, results) => {
      if(error) {
        reject(error.stack);
      }
      resolve(results.rows[0]);
    });
  });
};

const updateUserData = (email, password, nickname, uid) => {
  return new Promise( (resolve, reject) => {
    pool.query(`UPDATE ${userDB} SET email = '${email}', password = '${password}', nickname = '${nickname}' WHERE uid = '${uid}' RETURNING *`, (error, results) => {
      if(error) {
        reject(error.stack);
      }
      resolve(results.rows[0]);
    });
  });
};

const getCurrentUser = (userid) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT email, nickname FROM ${userDB} WHERE uid = '${userid}'`, (error, results) => {
      if(error) {
        reject(error.stack);
      }
      resolve(results.rows[0]);
    });
  });
};

const removeUser = (userId) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM ${userDB} WHERE uid = '${userId}'`, (error, results) => {
      if(error) {
        reject(error.stack);
      }
      resolve(results.rows[0]);
    });
  });
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByNickName,
  getCurrentUser,
  updateUserData,
  removeUser
};