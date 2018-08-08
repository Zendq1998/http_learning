const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
  console.log('request come', request.url)

  const html = fs.readFileSync('test.html', 'utf8')
  // 通过node的fs模块读取html文件（同步），要设置编码为utf8，否则读取的内容是二进制
  
  response.writeHead(200, {
    'Content-Type': 'text/html'
  })
  // 告诉浏览器发送的是html格式的而不是字符串

  response.end(html)
  // 发送html
}).listen(8888)

console.log('server listening on 8888')