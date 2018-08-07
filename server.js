const http = require('http')

http.createServer((request, response) => {
  console.log('request come', request.url)

  response.end('123') 
}).listen(8888)