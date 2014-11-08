const kHanStart = 0xAC00;

var sungs = ['ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ',
       'ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅘ ㅙ ㅚ ㅛ ㅜ ㅝ ㅞ ㅟ ㅠ ㅡ ㅢ ㅣ',
       ' ㄱ ㄲ ㄳ ㄴ ㄵ ㄶ ㄷ ㄹ ㄺ ㄻ ㄼ ㄽ ㄾ ㄿ ㅀ ㅁ ㅂ ㅄ ㅅ ㅆ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ'];
sungs.forEach(function(e,i){
  sungs[i] = e.split(' ');
});
const sungsCountLastTwo = (sungs[1].length*sungs[2].length);
const sungsCountLast = sungs[2].length;

var hanbreak = function(input){
  var result = '';
  for(var i = 0; i < input.length; i++){
    var remainder = 0;
    var basic = input.charAt(i);
    var charcode = input.charCodeAt(i);
    charcode -= kHanStart;
    var chosung = parseInt(charcode / sungsCountLastTwo);
    remainder = charcode % sungsCountLastTwo;
    var joongsung = parseInt(remainder / sungsCountLast);
    var jongsung = remainder % sungsCountLast;
    if(sungs[0][chosung] || sungs[1][joongsung] || sungs[2][jongsung]){
      result += sungs[0][chosung];
      result += sungs[1][joongsung];
      result += sungs[2][jongsung];
    }else{
      result += basic;
    }
  }
  return result;
};

var lastsung = function(keyword){
  keyword = hanbreak(keyword);
  var last = keyword.charAt(keyword.length-1);
  return last;
} 

var containsJongsung = function(keyword){
  var last = lastsung(keyword);
  return (sungs[2].indexOf(last) != -1);
}

module.exports.hanbreak = hanbreak;
module.exports.lastsung = lastsung;
module.exports.containsJongsung = containsJongsung;
module.exports.eunneun = function(keyword){
  return keyword + (containsJongsung(keyword) ? '은' : '는');
}
module.exports.eulreul = function(keyword){
  return keyword + (containsJongsung(keyword) ? '을' : '를');
}
module.exports.iga = function(keyword){
  return keyword + (containsJongsung(keyword) ? '이' : '가');
}
module.exports.roeuro = function(keyword){
  return keyword + ((!containsJongsung(keyword) || lastsung(keyword) == 'ㄹ') ? '로' : '으로');
}