function getPage(currentPage = 1, listPerPage = 10) {
  return (currentPage - 1) * listPerPage;
};

function emptyOrRows(rows, currentUser) {
  const item = rows.map(row => ({
      ...row,
    creator: {
      nickname: currentUser.nickname,
      uid: row.creator
    } 
  }));
  if (!rows) {
    return [];
  }
  return item;
};

module.exports = {
  getPage,
  emptyOrRows
};