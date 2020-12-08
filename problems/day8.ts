const fs = require('fs');

function parseInput(filename: string) {
  const contents = fs.readFileSync(filename, 'utf-8');
  const contentArray = contents.split('\n');
  return contentArray;
}

function getInstruction (line) {
  const [instruction, operandString] = line.split(' ');
  const operand = parseInt(operandString, 10);
  return { instruction, operand };
}

function getAccAtInifiniteLoop(instructions) {
  let nextInstructionLine = 0;
  const vistedInstructionMap = {};
  let accumulator = 0;
  while(nextInstructionLine < instructions.length && !vistedInstructionMap[nextInstructionLine]) {
    vistedInstructionMap[nextInstructionLine] = true;
    const { instruction, operand } = getInstruction(instructions[nextInstructionLine]);
    if (instruction === 'nop') {
      nextInstructionLine += 1;
    } else if(instruction === 'acc') {
      nextInstructionLine += 1;
      accumulator += operand;
    } else if (instruction === 'jmp') {
      nextInstructionLine += operand;
    }
  }
  return accumulator;
}

function detectInfiniteLoop (instructions) {
  let nextInstructionLine = 0;
  const vistedInstructionMap = {};
  let accumulator = 0;
  let flag = false;
  while(nextInstructionLine < instructions.length && !flag) {
    vistedInstructionMap[nextInstructionLine] = true;
    const { instruction, operand } = getInstruction(instructions[nextInstructionLine]);
    if (instruction === 'nop') {
      nextInstructionLine += 1;
    } else if(instruction === 'acc') {
      nextInstructionLine += 1;
      accumulator += operand;
    } else if (instruction === 'jmp') {
      nextInstructionLine += operand;
    }
    if (vistedInstructionMap[nextInstructionLine]) {
      flag = true;
    }
  }
  return { accumulator, flag} ;
}

function fixInfiniteLoop (instructions) {
  let infiniteLoopExists = true;
  let index = 0;
  let result;
  while (infiniteLoopExists && index < instructions.length) {
    const { instruction } = getInstruction(instructions[index]);
    let changedInstructions = [...instructions];
    if (instruction === 'nop') {
      changedInstructions[index] =  instructions[index].replace('nop', 'jmp');
      const { accumulator, flag } = detectInfiniteLoop(changedInstructions);
      if (!flag) {
        infiniteLoopExists = false;
        result = accumulator;
      }
    } else if (instruction === 'jmp') {
      changedInstructions[index] =  instructions[index].replace('jmp', 'nop');
      const { accumulator, flag } = detectInfiniteLoop(changedInstructions);
      if (!flag) {
        infiniteLoopExists = false;
        result = accumulator;
      }
    }
    index++;
  }
  return result;
}
// sample part1
const sampleInputDay8Part1 = parseInput('./input/day8-sample.txt');
const samplePart1 = getAccAtInifiniteLoop(sampleInputDay8Part1);
console.log('sample result part 1', samplePart1);

// part1
const inputDay8Part1 = parseInput('./input/day8.txt');
const day8Part1 = getAccAtInifiniteLoop(inputDay8Part1);
console.log('result part 1', day8Part1);

// sample part2
const sampleInputDay8Part2 = parseInput('./input/day8-sample.txt');
const samplePart2 = fixInfiniteLoop(sampleInputDay8Part2);
console.log('sample result part 2', samplePart2);

//part 2
const inputDay8Part2 = parseInput('./input/day8.txt');
const day8Part2 = fixInfiniteLoop(inputDay8Part2);
console.log('result part 2', day8Part2);