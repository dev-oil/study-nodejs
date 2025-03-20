const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep); // 경로의 구분자
console.log('path.delimiter:', path.delimiter); // 환경 변수의 구분자

console.log('------------------------------');
console.log('path.dirname():', path.dirname(string)); // 파일이 위치한 폴더 경로를 보여줌
console.log('path.extname():', path.extname(string)); // 파일의 확장자를 보여줌
console.log('path.basename():', path.basename(string)); // 파일의 이름(확장자 포함)을 보여줌
console.log(
  'path.basename - extname:',
  path.basename(string, path.extname(string))
); // 파일의 이름만 표시하고 싶을 때

console.log('------------------------------');
console.log('path.parse()', path.parse(string)); // 파일 경로를 root, dir, base, ext, name으로 분리
console.log(
  'path.format():',
  path.format({
    dir: 'C:\\users\\devoil',
    name: 'path',
    ext: '.js',
  })
); // path.parse()한 객체를 파일 경로로 합친다
console.log(
  'path.normalize():',
  path.normalize('C://users\\\\devoil\\path.js')
); // '/' 나 '\'를 실수로 여러번 사용했거나 혼용했을 때 정상적인 경로로 변환

console.log('------------------------------');
console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\')); // 파일의 경로가 절대경로인지 상대경로인지를 true나 false로 알림 - 절대경로 (true)
console.log('path.isAbsolute(./home):', path.isAbsolute('./home')); // 상대경로 (false)

console.log('------------------------------');
console.log(
  'path.relative():',
  path.relative('C:\\users\\devoil\\path.js', 'C:\\')
); // 경로를 두개 넣으면 첫번째 경로에서 두번째 경로로 가는 방법을 알려줌
console.log(
  'path.join():',
  path.join(__dirname, '..', '..', '/users', '.', '/devoil')
); // 여러 인수를 넣으면 하나의 경로로 합쳐줌. 상대 경로인 ..(부모 디렉터리) 와 .(현 위치)도 알아서 처리해줌
console.log(
  'path.resolve():',
  path.resolve(__dirname, '..', 'users', '.', '/devoil')
); // 하나의 경로로 합쳐줌. 그러나 /를 만난다면 절대경로로 인식하여 앞의 경로를 무시함

// 가끔 윈도우에서 POSIX 스타일 경로를 사용할 때
// path.posix.sep
// path.posix.join() 이런식으로 사용할 수 있음

// POSIX 에서 윈도우 스타일을 쓸 때
// path.win32.sep
// path.win32.join() 등과 같이 사용할 수 있음
