const http = require('http');
const https = require('https');
const url = require('url');

function sendRequest(options, callback) {
  const request = (options.protocol === 'https:' ? https : http).request(options, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk.toString();
    });
    response.on('end', () => {
      callback(null, response, data);
    });
  });

  request.on('error', (err) => {
    callback(err);
  });

  if (options.method !== 'GET' && options.data) {
    request.write(options.data);
  }
  request.end();
}

function generateFakeRequests(options) {
  const threads = [];

  for (let i = 0; i < options.numRequests; i++) {
    const thread = new Promise((resolve) => {
      const requestOptions = {
        protocol: url.parse(options.url).protocol,
        hostname: url.parse(options.url).hostname,
        port: url.parse(options.url).port,
        path: url.parse(options.url).path,
        method: options.method,
        headers: options.headers
      };

      if (options.data) {
        requestOptions.data = JSON.stringify(options.data);
        requestOptions.headers = {
          ...requestOptions.headers,
          'Content-Type': 'application/json'
        };
      }

      sendRequest(requestOptions, (err, response, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${options.method} ${options.url} - Status: ${response.statusCode}`);
        }
        resolve();
      });
    });
    threads.push(thread);
  }

  return Promise.all(threads);
}

// Example usage
generateFakeRequests({
  url: 'https://your-server.com/api/endpoint',
  method: 'POST',
  numRequests: 100,
  data: { key: 'value' },
  headers: {
    'Content-Type': 'application/json'
  }
}).then(() => {
  console.log('All requests completed');
}).catch((err) => {
  console.error(err);
});