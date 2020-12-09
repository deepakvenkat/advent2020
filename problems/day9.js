const { twoSum } = require('./day1');
const { parseIntInput } = require('./util');

function findWeakness(preamble, input) {
  let foundWeakness = false;
  let i;
  for (i = preamble; i < input.length && !foundWeakness; i++) {
    const result = twoSum(input[i], input.slice(i - preamble, i));
    foundWeakness = result.length === 0;
  }
  return input[i - 1];
}

function getContiguousWeakness(weakness, input) {
  let i, j;
  let resultFound = false;
  let checkArray = [];
  for (i = 2; i < input.length && !resultFound; i++) {
    for (j = 0; j + i < input.length && !resultFound; j++) {
      checkArray = input.slice(j, j + i);
      const sum = checkArray.reduce((acc, val) => acc + val, 0);
      if (sum === weakness) { 
        resultFound = true;
      }
    }
  }
  return (Math.min(...checkArray) + Math.max(...checkArray));
};

// sample part 1
const sampleInput = parseIntInput('./input/day9-sample.txt');
const sampleResultPart1 = findWeakness(5, sampleInput);
console.log('sample part 1', sampleResultPart1);

// part 1
const inputPart1 = parseIntInput('./input/day9.txt');
const resultPart1 = findWeakness(25, inputPart1);
console.log(' part 1', resultPart1);

// sample part2 
const sampleResultPart2 = getContiguousWeakness(sampleResultPart1, sampleInput);
console.log('sample part 2', sampleResultPart2);

// part 2
// sample part2 
const resultPart2 = getContiguousWeakness(resultPart1, inputPart1);
console.log('part 2', resultPart2);