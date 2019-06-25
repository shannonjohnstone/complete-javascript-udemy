const fs = require('fs');
const http = require('http');

/**
 * __dirname is the current directory path location name
 */
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8', 'a');

const server = http.createServer((req, res) => {
  console.log('Someone has accessed the server.');
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end('<h1>This is a response from your new node server</h1>');
});

server.listen(1337, () => {
  console.log('Server Started');
});
