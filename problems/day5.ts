const fs = require('fs');

function getInputArray (filename: string): Array<string> {
  const contents = fs.readFileSync(filename, 'utf-8');
  const contentArray = contents.split('\n');
  return contentArray;
}

function getIdFromSquence(sequence: string, totalRows: number = 128, totalColumns: number = 8): number {
  const sequenceArea = sequence.split('');
  let top = 0;
  let bottom = totalRows - 1;
  let left = 0;
  let right = totalColumns - 1;
  sequenceArea.forEach((seq) => {
    const hcenter = Math.ceil(bottom - top)/2;
    const vcenter = Math.ceil(right - left)/2;
    if (seq === 'F'){
      bottom -= hcenter;
    } else if (seq === 'B') {
      top += hcenter;
    } else if (seq === 'R') {
      left += vcenter;
    } else if (seq === 'L') {
      right -= vcenter;
    }
  });
  return (Math.min(top, bottom) * 8 + Math.min(left, right));
}
// test inputs
// BFFFBBFRRR: row 70, column 7, seat ID 567.
// FFFBBBFRRR: row 14, column 7, seat ID 119.
// BBFFBBFRLL: row 102, column 4, seat ID 820.
console.log(getIdFromSquence('FBFBBFFRLR', 128, 8));
console.log(getIdFromSquence('BFFFBBFRRR', 128, 8));
console.log(getIdFromSquence('FFFBBBFRRR', 128, 8));
console.log(getIdFromSquence('BBFFBBFRLL', 128, 8));

function getMaxSeatNumber (inputArray: Array<string>): number {
  const result = inputArray.reduce((previousMax, seatSequence) => {
    const currentId = getIdFromSquence(seatSequence);
    return Math.max(currentId, previousMax);
  }, -1);
  return result;
}

function getAllSeatNumber (inputArray: Array<string>): number{
  const max = (127 * 8) + 7;
  const seatArray = Array.from({length: max + 1}, (_, i) => false);
  inputArray.forEach((input) => {
    seatArray[getIdFromSquence(input)] = true;
  })
  let missing;
  for (let i = 0 ; i < seatArray.length; i++) {
    if (seatArray[i] === false)  {
      if ((i - 1 > -1 && seatArray[i - 1]) && (i + 1 < seatArray.length && seatArray[i+1])) {
        missing = i;
      }
    }
  }
  return missing;
}
// part 1
const input = getInputArray('./input/day5.txt');
const part1 = getMaxSeatNumber(input);
console.log('Max Seat', part1);

// part 2
const part2 = getAllSeatNumber(input);
console.log('missing seat', part2);