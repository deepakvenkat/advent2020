const fs = require('fs');

function parseInput(filename) {
  const contents = fs.readFileSync(filename, 'utf-8');
  const contentArray = contents.replace(/\n/g, '-').replace(/--/g, '\n').replace(/-/g, ' ').split('\n');
  return contentArray;
}

function getFieldsString(fields, optional=['cid']) {
  const fieldString = fields.sort().join();
  const fieldOptionalString = fields.filter((x) => !optional.includes(x)).sort().join();
  return { fieldString, fieldOptionalString };
}
function validateInput (inputList, fieldString, fieldOptionalString) {
  let validCount = 0;
  const regEx = /([a-z]+):/g;
  inputList.forEach((input) => {
    const groups = Array.from(input.matchAll(regEx), (m) => m[0]);
    const fields = groups.sort().join().replace(/:/g, '');
    if (fields === fieldString || fields === fieldOptionalString) {
      validCount++;
    }
  });
  return validCount;
}
const input = parseInput('./input/day4.txt');
// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)
// cid (Country ID)
const fields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  'cid',
];
// part 1
const fieldStrings = getFieldsString(fields);

const result = validateInput(input, fieldStrings.fieldString, fieldStrings.fieldOptionalString);
console.log(result);

// part 2
const validateNumber = (input, min, max) => {
  const number = parseInt(input, 10) || 0;
  return (number >= min) && (number <= max);
}
const fieldValidation = {
  byr: (input) => validateNumber(input, 1920, 2002),
  iyr: (input) => validateNumber(input, 2010, 2020),
  eyr: (input) => validateNumber(input, 2020, 2030),
  hgt: (input) => {
    try {
      const [_, heightS, unit] = input.match(/(\d+)(cm|in)/);
      const height = parseInt(heightS, 10);
      if (unit === 'cm') {
        return validateNumber(height, 150, 193);
      } else {
        return validateNumber(height, 59, 76);
      }
    } catch {
      return false;
    }
  },
  ecl: (input) => ['amb','blu', 'brn', 'gry', 'grn','hzl','oth'].includes(input),
  pid: (input) => {
    if (input.length !== 9) {
      return false;
    }
    const group = input.match(/\d+/g);
    return (group[0] === input);
  },
  hcl: (input) => {
    if (input.length !== 7 || input[0] !== '#') {
      return false;
    }
    const group = input.match(/[a-f0-9]+/g);
    return (group[0] && group[0].length === 6);
  },
  cid: (_) => true,
};

const validateInputValues = (inputList, validators) => {
  let validCount = 0;
  inputList.forEach((input) => {
    const fieldList = input.match(/([a-z]+:\S+)/g);
    let valid = true;
    let fieldCount = 0;
    fieldList.forEach((fieldString) => {
      const [key, value] = fieldString.split(':');
      try {
        if (key !== 'cid' && validators[key]) {
          fieldCount++;
        }
        valid = valid && validators[key](value);
      } catch {
        valid = false;
      }
    });
    if (valid && fieldCount === fields.length - 1){
      validCount++;
    }
  });
  return validCount;
}

const result2 = validateInputValues(input, fieldValidation);
console.log(result2);