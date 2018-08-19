const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200,{ 'Content-Type': 'text/html' })
  res.end('hello <b>world</b>!')
}).listen(3000)