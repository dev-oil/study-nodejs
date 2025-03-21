## Callback -> Promise -> Async / Await

### 참고할만한 자료

[비동기, Promise, async / await 확실하게 이해하기](https://springfall.cc/article/2022-11/easy-promise-async-await)

### Promise 구현해보기

[Promise 직접 구현해보기](https://github.com/dev-oil/study-js/blob/feature/js-deep-promise/js-deep/promise.js)

## 파일 시스템

### +) 유갱갱님거 보고 궁금해서 정리한 readFile 인코딩 방식

#### 1. `utf-8` 인코딩을 전달하는 방식

```tsx
const fs = require('fs');
const file = 'file.txt';

fs.readFile(file, 'utf-8', (err, data) => {
  if (err) console.log(err);
  else console.log(data); // 문자열로 바로 출력
});
```

### 특징

- `readFile` 함수의 두 번째 인자로 `"utf-8"`을 전달하면 **파일을 읽을 때 바로 문자열로 변환**한다.
- 콜백의 `data` 인자는 이미 문자열이다.
- 코드가 간결하고 명시적이며, **가독성이 좋다.**

### 2. `Buffer`로 읽고 `toString()` 사용

```tsx
const fs = require('fs');
const file = 'file.txt';

fs.readFile(file, (err, data) => {
  if (err) console.log(err);
  else console.log(data.toString());
});
```

### 특징

- 인코딩을 명시하지 않으면 `Buffer`로 데이터를 읽어온다.
- `Buffer`를 문자열로 변환하려면 `toString()`을 호출해야 한다.
- 인코딩을 나중에 처리할 수 있는 유연성이 있지만, **조금 더 번거롭다.**

---

### 어떤 방식을 사용할까?

1. **단순히 문자열로 읽고자 할 때:**
   - `utf-8`을 인자로 전달하는 첫 번째 방식을 권장합니다. 간단하고 명시적이기 때문에 실용적이다.
   - 대부분의 경우 이 방식이 적합하다.
2. **파일 인코딩이 다양하거나 버퍼로 처리해야 할 때:**
   - 두 번째 방식이 더 적합하다.
   - 데이터를 처리할 때 인코딩을 동적으로 바꾸거나, 버퍼 조작이 필요한 경우 사용한다.

---
