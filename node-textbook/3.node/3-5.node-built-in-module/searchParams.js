// searchParams ? search 부분을 다루기 위한 특수한 객체 (키 = 값 형식)

const myURL = new URL(
  'http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript'
);
console.log('searchParams:', myURL.searchParams); // 모든 search 키 = 값 가져오기
console.log('searchParams.getAll():', myURL.searchParams.getAll('category')); // 키에 해당하는 모든 값 가져오기
console.log('searchParams.get():', myURL.searchParams.get('limit')); // 키에 해당하는 첫번째 값만 가져오기
console.log('searchParams.has():', myURL.searchParams.has('page')); // 해당 키가 있는지 없는지 검사

console.log('searchParams.keys():', myURL.searchParams.keys()); // 모든 키를 반복기(iterator) 객체로 가져옴
console.log('searchParams.values():', myURL.searchParams.values()); // 모든 값을 반복기 객체로 가져옴

myURL.searchParams.append('filter', 'es3'); // 해당 키를 추가한다.
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6'); // append와 비슷하지만, 같은 키의 값을 모두 지우고 새로 추가한다.
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter'); // 해당 키를 제거한다.
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString():', myURL.searchParams.toString()); // 객체를 다시 문자열로 만듦.
myURL.search = myURL.searchParams.toString(); // 만든 문자열을 search에 대입하면 주소 객체에 반영된다.
