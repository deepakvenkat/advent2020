const fs = require('fs');

function parseInput (filename: string): Array<string> {
  const contents = fs.readFileSync(filename, 'utf-8');
  return contents.split('\n');
}

function buildDepMatrix (input: Array<string>) {
  const depMatrix = {}
  input.forEach((line) => {
    let [outer, innerList] = line.split('bags contain');
    if (!innerList || !outer) {
      return;
    }
    outer = outer.trim();
    depMatrix[outer] = {};
    innerList.split(',').forEach((innerBag) => {
      if (innerBag.indexOf('no') > 0) {
        return;
      }
      let [number, color1, color2] = innerBag.trim().split(' ');
      color1 = color1.trim();
      color2 = color2.trim();
      depMatrix[outer][`${color1} ${color2}`] = parseInt(number, 10);
    });
  });
  return depMatrix;
}

function doesPathExist(matrix, start, key): boolean {
  if (!matrix[start]) {
    return false;
  }
  const inner = Object.keys(matrix[start]);
  if (inner.length === 0) {
    return false;
  }
  if (inner.includes(key)) {
    return true;
  }
  return inner.reduce((acc, value) => acc || doesPathExist(matrix, value, key), false);
}

function getAllPaths (depMatrix: object, key: string) {
  let count = 0;
  Object.keys(depMatrix).forEach((outer) => {
    if (outer === key) {
      const inner = depMatrix[outer];
      if (Object.keys(inner).length === 0) {
        count += 1;
      }
    } else {
      if (doesPathExist(depMatrix, outer, key)) {
        count +=1;
      }
    }
  })
  return count;
}

function getLongestPathForKey (depMatrix: object, key: string) {
  let count = 0;
  if (!depMatrix[key]) {
    return 0;
  }
  const innerMap = depMatrix[key];
  const innerList = Object.keys(innerMap);
  if (innerList.length === 0) {
    return 0;
  }
  innerList.forEach((inner) => {
    count = count + innerMap[inner] + innerMap[inner] * getLongestPathForKey(depMatrix, inner);
  })
  return count;
}

// sample part1
const sampleInputDay7Part1 = parseInput('./input/day7-sample.txt');
const sampleDepMatrixPart1 = buildDepMatrix(sampleInputDay7Part1);
const samplePathsPart1 = getAllPaths(sampleDepMatrixPart1, 'shiny gold');
console.log('part 1 sample', samplePathsPart1);

// part1
const inputDay7Part1 = parseInput('./input/day7.txt');
const depMatrixPart1 = buildDepMatrix(inputDay7Part1);
const pathsPart1 = getAllPaths(depMatrixPart1, 'shiny gold');
console.log('part 1 actual', pathsPart1);

// part 2
const sampleInputDay7Part2 = parseInput('./input/day7-sample.txt');
const sampleDepMatrixPart2 = buildDepMatrix(sampleInputDay7Part2);
const samplePathsPart2 = getLongestPathForKey(sampleDepMatrixPart2, 'shiny gold');
console.log('part 2 sample', samplePathsPart2);

const inputDay7Part2 = parseInput('./input/day7.txt');
const depMatrixPart2 = buildDepMatrix(inputDay7Part2);
const pathsPart2 = getLongestPathForKey(depMatrixPart2, 'shiny gold');
console.log('part 2 actual', pathsPart2);