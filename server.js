const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const PUBLIC_DIR = path.join(__dirname, 'public');


const server = http.createServer((req, res) => {
  
  if (req.url === '/' || req.url === '/index.html') {
    const filePath = path.join(PUBLIC_DIR, 'index.html');
    serveStaticFile(filePath, 'text/html', res);
  } else if (req.url === '/style.css') {
    const filePath = path.join(PUBLIC_DIR, 'style.css');
    serveStaticFile(filePath, 'text/css', res);
  } else if (req.url === '/script.js') {
    const filePath = path.join(PUBLIC_DIR, 'script.js');
    serveStaticFile(filePath, 'application/javascript', res);
  } else if (req.url === '/questions') {
    const filePath = path.join(__dirname, 'questions.json');
    serveStaticFile(filePath, 'application/json', res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});


function serveStaticFile(filePath, contentType, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
      console.log(data);
      
    }
  });
}


server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});