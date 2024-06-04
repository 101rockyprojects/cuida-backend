function getQuery(baseQuery) {
  return JSON.parse(JSON.stringify(baseQuery));
}

module.exports = { getQuery };