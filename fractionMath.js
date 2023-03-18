const reduce = (numerator, denominator) => {
  const gcd = (a, b) => {
    return b ? gcd(b, a % b) : a;
  };

  my_gcd = gcd(numerator, denominator);

  return [`${numerator / my_gcd}/${denominator / my_gcd}`];
};

const add = ({ numerator1, denominator1 }, { numerator2, denominator2 }) => {
  const denominator = denominator1 * denominator2;
  const numerator =
    (denominator / denominator1) * numerator1 +
    (denominator / denominator2) * numerator2;

  return reduce(numerator, denominator);
};

const subtract = (
  { numerator1, denominator1 },
  { numerator2, denominator2 }
) => {
  const denominator = denominator1 * denominator2;
  const numerator =
    (denominator / denominator1) * numerator1 -
    (denominator / denominator2) * numerator2;

  return reduce(numerator, denominator);
};

const multiply = (
  { numerator1, denominator1 },
  { numerator2, denominator2 }
) => {
  const numerator = numerator1 * numerator2;
  const denominator = denominator1 * denominator2;

  return reduce(numerator, denominator);
};

const divide = ({ numerator1, denominator1 }, { numerator2, denominator2 }) => {
  const numerator = numerator1 * denominator2;
  const denominator = numerator2 * denominator1;

  return reduce(numerator, denominator);
};

const fractionMath = (fraction1, operation, fraction2) => {
  const [numerator1, denominator1] = fraction1.split("/").map(Number);
  const [numerator2, denominator2] = fraction2.split("/").map(Number);

  if (operation === "add")
    return add({ numerator1, denominator1 }, { numerator2, denominator2 });
  else if (operation === "subtract")
    return subtract({ numerator1, denominator1 }, { numerator2, denominator2 });
  else if (operation === "multiply")
    return multiply({ numerator1, denominator1 }, { numerator2, denominator2 });
  else if (operation === "divide")
    return divide({ numerator1, denominator1 }, { numerator2, denominator2 });

  return "No valid operation provided (add, subtract, multiply, divide)";
};

// Cassidoo tests
console.log(fractionMath("3/4", "add", "3/4"));
console.log(fractionMath("1/8", "multiply", "2/2"));

// My tests
console.log(fractionMath("2/8", "add", "2/8"));
console.log(fractionMath("4/8", "subtract", "2/8"));
console.log(fractionMath("4/8", "multiply", "2/8"));
console.log(fractionMath("4/5", "divide", "2/8"));
