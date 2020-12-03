const { inputArray } = require('../input/day2');


// part 1
function countValidPasswords (inputList) {
	let count = 0;
	const regEx = /([0-9]+)-([0-9]+)\s(.):\s(.+)/;
	inputList.forEach((input) => {

		const [_, min, max, key, password] = input.match(regEx);
		const countRegEx = new RegExp(key, 'g');
		const keyArray = Array.from(password.matchAll(countRegEx), (m) => m[0]);
		if (keyArray.length >= min && keyArray.length <= max) {
			count++;
		}
	})
	return count;
};


console.log(countValidPasswords(inputArray));

const testInput = [
	'1-3 a: abcde',
	'1-3 b: cdefg',
	'2-9 c: ccccccccc',
];
// part 2
function countValidCharPositions (inputList) {
	let count = 0;
	const regEx = /([0-9]+)-([0-9]+)\s(.):\s(.+)/;
	inputList.forEach((input) => {
		const [_, pos1, pos2, key, password] = input.match(regEx);
		const actualPos1 = pos1 - 1;
		const actualPos2 = pos2 - 1;
		if ((password[actualPos1] === key && password[actualPos2] !== key) || (password[actualPos1] !== key && password[actualPos2] === key)) {
			count++;
		}
	});
	return count;
}

console.log(countValidCharPositions(inputArray));