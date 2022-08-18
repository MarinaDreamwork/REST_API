const jwt = require('jsonwebtoken');
const { findToken, createToken, updateToken } = require('../models/token.model');

class TokenService {
  generate(payload) {
    const token = jwt.sign(payload, process.env.TOKEN)
    return {
      token, expire: 1800
    }
  }

  async save(userid, updatedToken) {
    const data = await findToken({ field: 'userid', value: userid });
    if(data) {
      const newData = await updateToken(userid, updatedToken); 
      return newData;
    }
    const newToken = await createToken(userid, updatedToken);
    console.log('newToken', newToken);
    return newToken;
  };

  validateToken(token) {
    try {
      return jwt.verify(token, process.env.TOKEN);
    } catch(error) {
      return null;
    }
  }

  findDBToken(token) {
    try {
      return findToken({ field: 'token', value: token });
    } catch(error) {
      return error;
    }
  }
};

module.exports = new TokenService();