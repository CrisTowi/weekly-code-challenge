function removeByIndex(str, index) {
  return str.slice(0, index) + str.slice(index + 1);
}
function mixWord(str) {
  let res = "";

  while (str.length) {
    const randomIndex = Math.floor(Math.random() * str.length);
    res += str[randomIndex];
    str = removeByIndex(str, randomIndex);
  }

  return res;
}
function scramble(str) {
  var words = str.replaceAll(".", "").split(" ");

  for (var i = 0; i < words.length; i++) {
    if (words[i].length > 3) {
      words[i] = mixWord(words[i]);
    }
  }

  return words.join(" ");
}
