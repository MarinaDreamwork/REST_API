module.exports = checkTags = (arr) => {
  const result = [];
  for(let i of arr) {
    if(i) {
      result.push(i);
    } else {
      return [];
    }
  }
  return result;
};