const fs = require ('fs');

function parseInput(filename) {
  const contents = fs.readFileSync(filename, 'utf-8');
  const contentArray = contents.split('\n');
  return contentArray;
}

function parseIntInput(filename) {
  const contents = fs.readFileSync(filename, 'utf-8');
  const contentArray = contents.split('\n');
  return contentArray.map((c) => parseInt(c, 10));
}
module.exports = { parseInput, parseIntInput };