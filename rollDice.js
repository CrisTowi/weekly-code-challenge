function evalSingleExpression(expression) {
  const [dices, faces] = expression.split("d");

  const nDices = Number(dices);
  const nFaces = Number(faces);

  // Get a random number between the minimum value (number of dices that can at least have 1)
  // and the maximum value (the number that comes if all the dices shows the biggest value they own)
  return Math.floor(Math.random() * (nDices * nFaces - nDices) + nDices);
}

function rollDice(expression) {
  const singleExpressions = expression.split("+");

  const result = singleExpressions.reduce((accum, singleExpression) => {
    return accum + evalSingleExpression(singleExpression);
  }, 0);

  return result;
}

console.log(rollDice("4d4"));
console.log(rollDice("3d20"));
console.log(rollDice("1d8+2d10"));
