// callback
function fetchDataWithCallback(
  url: string,
  callback: (data: string) => void
): void {
  setTimeout(() => {
    const data = `Data from ${url}`;
    callback(data);
  }, 1000);
}

fetchDataWithCallback('https://example.com', (data) => {
  console.log('Callback:', data);
});

// promise
function fetchDataWithPromise(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = `Data from ${url}`;
      resolve(data);
    }, 1000);
  });
}

fetchDataWithPromise('https://example.com')
  .then((data) => {
    console.log('Promise:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Async / Await
async function fetchDataWithAsync(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = `Data from ${url}`;
      resolve(data);
    }, 1000);
  });
}

async function fetchData() {
  try {
    const data = await fetchDataWithAsync('https://example.com');
    console.log('Async/Await:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
