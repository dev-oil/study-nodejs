const os = require('os');

console.log('운영체제 정보---------------------------------');
console.log('os.arch():', os.arch()); // 프로세서 아키텍처 정보 === process.arch
console.log('os.platform():', os.platform()); // 플랫폼 정보 === process.platform
console.log('os.type():', os.type()); // 운영 체제 종류
console.log('os.uptime():', os.uptime()); // 운영 체제 부팅 이후 흐른 시간을 보여줌 (process.uptime()은 노드의 실행 시간)
console.log('os.hostname():', os.hostname()); // 컴퓨터의 이름을 보여줌
console.log('os.release():', os.release()); // 운영체제의 버전을 보여줌

console.log('경로------------------------------------------');
console.log('os.homedir():', os.homedir()); // 홈 디렉터리 경로를 보여줌
console.log('os.tmpdir():', os.tmpdir()); // 임시 파일 저장 경로를 보여줌

console.log('cpu 정보--------------------------------------');
console.log('os.cpus():', os.cpus()); // 컴퓨터 코어 정보 보여줌
console.log('os.cpus().length:', os.cpus().length);
// 노드에서 싱글 스레드 프로그래밍을 하면, 코어가 몇 개든 상관 없이 대부분 코어를 하나밖에 사용하지 않긴 함, 근데 cluster 모듈을 사용한다면 코어 개수에 맞춰서 프로세스를 늘릴 수 있음.

console.log('메모리 정보-----------------------------------');
console.log('os.freemem():', os.freemem()); // 사용 가능한 메모리(RAM) 보여줌
console.log('os.totalmem():', os.totalmem()); // 전체 메모리 용량 보여줌
