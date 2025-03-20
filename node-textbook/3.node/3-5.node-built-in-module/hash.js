const crypto = require('crypto');

// createHash(알고리즘) : 사용할 해시 알고리즘을 넣음.
// update(문자열) : 변환할 문자열을 넣는다.
// digest(인코딩) : 인코딩할 알고리즘을 넣는다. base64가 결과 문자열이 짧아서 애용됨
console.log(
  'base64:',
  crypto.createHash('sha512').update('비밀번호').digest('base64')
);
console.log(
  'hex:',
  crypto.createHash('sha512').update('비밀번호').digest('hex')
);
console.log(
  'base64:',
  crypto.createHash('sha512').update('다른 비밀번호').digest('base64')
);

// crypto
// 다양한 방식의 암호화를 도와주는 모듈.

// 단방향 암호화
// 비밀번호는 보통 단방향 암호화 알고리즘을 사용해서 암호화 함.
// 단방향 암호화란, 복호화 할 수 없는 암호화 방식을 뜻함. 해시 함수라고도 한다.
// 사용 방식? 고객의 비밀번호를 암호화해서 디비에 저장. 로그인할 때마다 입력받은 비밀번호를 같은 암호화 알고리즘으로 암호화 한 후, 디비의 비밀번호와 비교하면 됨.

// 단방향 암호화 알고리즘은 주로 해시 기법을 사용한다.
// 해시 기법이란? 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방식.
