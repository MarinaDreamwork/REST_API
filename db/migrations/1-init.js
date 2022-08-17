const createUserTable = require('./helpers/create-user-table');
const createTagTable = require('./helpers/create-tag-table');
const createTokenTable = require('./helpers/create-token-table');
const createExtensionForUserTable = require('./helpers/create-extension-user-table');

const generateSql = () => `${createExtensionForUserTable} ${createUserTable} ${createTokenTable} ${createTagTable}`;

module.exports.generateSql = generateSql; 