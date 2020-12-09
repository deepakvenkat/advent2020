const { inputArray } = require('../input/day1.json');

// part 1
function twoSum(key, inputList) {
	const twoSumMap = {};

	let result = [];
	inputList.forEach((input) => {
		twoSumMap[input] = true;
		const complement = key - input;
		if (twoSumMap[complement]) {
			result = [input, complement];
		}
	});
	return result;
}

function runProgram(){
	const part1Result = twoSum(2020, inputArray);
	if (part1Result[0] && part1Result[1]) {
		console.log('part 1 result', part1Result[0] * part1Result[1]);
		// 145875
	}
}

// part 2
const threeSum = (key, inputList) => {
	let result = [];
	inputList.forEach((input, i) => {
		const complement = key - input;
		const remaining = [...inputArray];
		remaining.splice(i);
		const twoSumRes = twoSum(complement, remaining);
		if (twoSumRes.length > 0) {
			result = [input, ...twoSumRes];
		}
	});
	return result;
};

function runPart2() {
	const part2Result = threeSum(2020, inputArray);
	if (part2Result.length > 0) {
		console.log('part 2 result', part2Result.reduce((acc, i) => acc * i, 1), part2Result);
	}
}

module.exports = { twoSum };
