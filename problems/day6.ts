const fs = require('fs');

function parseInputPart1(filename: string) {
  const contents = fs.readFileSync(filename, 'utf-8');
  const contentArray = contents.replace(/\n/g, '-').replace(/--/g, '\n').replace(/-/g, '').split('\n');
  return contentArray;
}

function parseInputPart2(filename: string) {
  const contents = fs.readFileSync(filename, 'utf-8');
  const contentArray = contents.replace(/\n/g, '-').replace(/--/g, '\n').replace(/-/g, ' ').split('\n');
  return contentArray;
}

function countPositive (inputArray: Array<string>) {
  let totalCount = 0;
  inputArray.forEach((input) => {
    const inputSet = new Set(input.trim().split(''));
    totalCount += inputSet.size;
  });
  return totalCount;
}

function countEveryone (inputArray: Array<string>) {
  let totalCount = 0;
  inputArray.forEach((input) => {
    const groupPeople = input.split(' ');
    const groupAnswers: object = {};
    let groupCount = 0;
    groupPeople.forEach((response) => {
      const answers = response.split('');
      answers.forEach((question) => {
        if (!groupAnswers[question]) {
          groupAnswers[question] = 0;
        }
        groupAnswers[question] = groupAnswers[question] + 1;
      });
    });
    Object.keys(groupAnswers).forEach((key: string) => {
      if (groupAnswers[key] === groupPeople.length) {
        groupCount += 1;
      }
    });
    totalCount += groupCount;
  });
  return totalCount;
}

// part 1
const sample = './input/day6-sample.txt';
const sampleInput = parseInputPart1(sample);
const sampleResult = countPositive(sampleInput);
console.log('Sample Result', sampleResult);

const day6Input = './input/day6.txt';
const inputArray = parseInputPart1(day6Input);
const  day6Part1 = countPositive(inputArray);
console.log('Result 1', day6Part1);


// part 2
const sampleInput2 = parseInputPart2(sample);
const sampleResult2 = countEveryone(sampleInput2);
console.log('Sample result 2', sampleResult2);

const inputArray2 = parseInputPart2(day6Input);
const  day6Part2 = countEveryone(inputArray2);
console.log('Result 2', day6Part2);
