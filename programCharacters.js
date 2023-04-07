const fs = require("fs");

function numberToWords(number) {
  const NUMBERS = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const SPECIALS = [
    "",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const TENS = [
    "",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  if (number === 0) {
    return "Zero";
  } else if (number < 10) {
    return NUMBERS[number];
  } else if (number < 20) {
    return SPECIALS[number - 9];
  } else if (number < 100) {
    const tens = Math.floor(number / 10);
    const rest = number - tens * 10;

    return `${TENS[tens]}-${numberToWords(rest)}`;
  } else if (number < 1000) {
    const hundreds = Math.floor(number / 100);
    const rest = number - hundreds * 100;

    return `${NUMBERS[hundreds]} hundred ${numberToWords(rest)}`;
  } else if (number < 10000) {
    const thousands = Math.floor(number / 1000);
    const rest = number - thousands * 1000;

    return `${numberToWords(thousands)} thousand ${numberToWords(rest)}`;
  }

  return "The number is too big";
}

function programCharacters() {
  const customFileName = process.argv[2];

  const fileName = customFileName || __filename;
  const fileContents = fs.readFileSync(fileName, "utf8");
  const fileContentsWithoutSpaces = fileContents.replace(/\s/g, "");
  const numCharacters = fileContentsWithoutSpaces.length;

  return numberToWords(numCharacters);
}

console.log(`This program contains ${programCharacters()} characters`);
