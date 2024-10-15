const parser = require('xlsx-to-json-parser');

const parse = async ({ path, password }) => {
  const data = await parser.parse({
    path,
    password
  })
  return data;
};

module.exports = {
  parse
};