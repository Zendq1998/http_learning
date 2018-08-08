const http = require('http')

http.createServer((request, response) => {
  console.log('request come', request.url)

  response.end('123')
}).listen(8887)

console.log('server listening on 8887')