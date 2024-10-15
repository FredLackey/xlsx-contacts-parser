const parser = require('./parser');
const converter = require('./converter');

const parse = async ({ path, password }) => {
  const workkbook = await parser.parse({
    path,
    password
  })
  return converter.convert(workkbook);
};

module.exports = {
  parse
};