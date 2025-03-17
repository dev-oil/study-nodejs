const a = true;

// ES 모듈의 최상위 스코프에서는 async 함수 없이도 await 할 수 있음. (common 에서는 안됨)
if (a) {
  const m1 = await import('./func.mjs');
  console.log(m1);
  const m2 = await import('./var.mjs');
  console.log(m2);
}
