const kHanStart = 0xac00;

const sungs = [
  "ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ",
  "ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅘ ㅙ ㅚ ㅛ ㅜ ㅝ ㅞ ㅟ ㅠ ㅡ ㅢ ㅣ",
  " ㄱ ㄲ ㄳ ㄴ ㄵ ㄶ ㄷ ㄹ ㄺ ㄻ ㄼ ㄽ ㄾ ㄿ ㅀ ㅁ ㅂ ㅄ ㅅ ㅆ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ",
];
sungs.forEach(function (e, i) {
  sungs[i] = e.split(" ");
});
const sungsCountLastTwo = sungs[1].length * sungs[2].length;
const sungsCountLast = sungs[2].length;

const changeFrom =
  "ㄲ ㄸ ㅃ ㅆ ㅉ ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ ㄳ ㄵ ㄶ ㄺ ㄻ ㄼ ㄽ ㄾ ㄿ ㅀ ㅄ".split(
    " "
  );
const changeTo =
  "ㄱㄱ ㄷㄷ ㅂㅂ ㅅㅅ ㅈㅈ ㅗㅏ ㅗㅐ ㅗㅣ ㅜㅓ ㅜㅔ ㅜㅣ ㅡㅣ ㄱㅅ ㄴㅈ ㄴㅎ ㄹㄱ ㄹㅁ ㄹㅂ ㄹㅅ ㄹㅌ ㄹㅍ ㄹㅎ ㅂㅅ".split(
    " "
  );

const hanbreak = function (input) {
  var result = "";
  for (var i = 0; i < input.length; i++) {
    var remainder = 0;
    var basic = input.charAt(i);
    var charcode = input.charCodeAt(i);
    charcode -= kHanStart;
    var chosung = parseInt(charcode / sungsCountLastTwo);
    remainder = charcode % sungsCountLastTwo;
    var joongsung = parseInt(remainder / sungsCountLast);
    var jongsung = remainder % sungsCountLast;
    if (sungs[0][chosung] || sungs[1][joongsung] || sungs[2][jongsung]) {
      result += sungs[0][chosung];
      result += sungs[1][joongsung];
      result += sungs[2][jongsung];
    } else {
      result += basic;
    }
  }
  return result;
};
const detailBreak = function (keyword) {
  var hanbroke = hanbreak(keyword);
  changeFrom.forEach(function (from, i) {
    var regex = new RegExp(from, "g");
    hanbroke = hanbroke.replace(regex, changeTo[i]);
  });
  return hanbroke;
};
const lastsung = function (keyword) {
  keyword = hanbreak(keyword);
  var last = keyword.charAt(keyword.length - 1);
  return last;
};

const firstsung = function (keyword) {
  keyword = hanbreak(keyword);
  var first = keyword.charAt(0);
  return first;
};

const containsJongsung = function (keyword) {
  var last = lastsung(keyword);
  return sungs[2].indexOf(last) != -1;
};

const getChosung = function (keyword) {
  const wordList = keyword.split("");
  let chosung = wordList.map((word) => {
    return firstsung(word);
  });
  return chosung;
};

module.exports = {
  hanbreak,
  detailBreak,
  lastsung,
  firstsung,
  containsJongsung,
  getChosung,
};

module.exports.eunneun = function (keyword) {
  return keyword + (containsJongsung(keyword) ? "은" : "는");
};
module.exports.eulreul = function (keyword) {
  return keyword + (containsJongsung(keyword) ? "을" : "를");
};
module.exports.iga = function (keyword) {
  return keyword + (containsJongsung(keyword) ? "이" : "가");
};
module.exports.roeuro = function (keyword) {
  return (
    keyword +
    (!containsJongsung(keyword) || lastsung(keyword) == "ㄹ" ? "로" : "으로")
  );
};