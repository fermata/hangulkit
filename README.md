# hangulkit
hangulkit은 Node.js를 위한 초성,종성,중성 분리 및 조사 생성 모듈입니다.


## hangulkit 설치방법 (How to install hangulkit)
“`
npm install hangulkit
“`

## 사용법 (Usage)
“`
var hangulkit = require('hangulkit');
“`

## 기능 (Functions)
### 초성중성종성 분리
Code:
“`
hangulkit.hanbreak('한글');
“`
Output(return):
“`
'ㅎㅏㄴㄱㅡㄹ'
“`

### 마지막 자음또는 모음 가져오기
Code:
“`
hangulkit.lastsung('한글');
“`
Output(return):
“`
'ㄹ'
“`

### 마지막 글자의 종성 유무 파악
Code:
“`
hangulkit.containsJongsung('한글');
“`
Output(return):
“`
true
“`

### 단어 끝에 은,는,이,가,을,를,로,으로 붙이기
Code:
“`
hangulkit.enunneun('노드제이에스');
hangulkit.iga('한국어');
hangulkit.eulreul('서울시');
hangulkit.roeuro('서울');
“`
Output(return):
“`
'노드제이에스는'
'한국어가'
'서울시를'
'서울로'
“`



