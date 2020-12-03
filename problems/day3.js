const fs = require('fs');

function parseInput (filename) {
  const contents = fs.readFileSync(filename, 'utf-8');
  const pathArray = contents.split('\n');
  return pathArray;
}

function getTreeCount (pathArray, right, down) {
  let currentColumn = 0;
  let treeCount = 0;
  for (let i = 0; i < pathArray.length - down; i += down) {
    const nextRow = pathArray[i + down].split('');
    currentColumn += right;
    if (nextRow[currentColumn % nextRow.length] === '#') {
      treeCount++;
    }
  }
  return treeCount;
};
const pathArray = parseInput('./input/day3.txt');
// part 1
const treeCount = getTreeCount(pathArray, 3, 1);

console.log(treeCount);

// part 2
/**
 * Right 1, down 1.
 * Right 3, down 1. 
 * Right 5, down 1.
 * Right 7, down 1.
 * Right 1, down 2.
 */
const results = [
  getTreeCount(pathArray, 1, 1),
  getTreeCount(pathArray, 3, 1),
  getTreeCount(pathArray, 5, 1),
  getTreeCount(pathArray, 7, 1),
  getTreeCount(pathArray, 1, 2),
];
console.log(results);
console.log(results.reduce((acc, i) => acc * i, 1));