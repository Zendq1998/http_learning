这个小例子展示了浏览器的同域的限制，也可以说是跨域问题。

### 创建两个绑定在不同端口的服务器

```js
// server1.js
const http = require('http')

http.createServer((request, response) => {
  console.log('request come', request.url)

}).listen(8888)

console.log('server listening on 8888')
```

```js
// server2.js
const http = require('http')

http.createServer((request, response) => {
  console.log('request come', request.url)

  response.end('123')
}).listen(8887)

console.log('server listening on 8887')
```

首先创建了两个相同的服务器，区别就是他们分别绑定在``8888``和``8887``端口上。

然后再创建一个简单的``html``页面，在``script``标签内通过``XMLHttpRequest``对象向本地的``8887``端口发送一个简单的请求。

``` html
<!-- test.html -->
<script>
  var xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://127.0.0.1:8887/')
  xhr.send()
</script>
```

接下来我们要让``server1``服务器去读取刚刚创建的``hest.html``：

```js
...
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
```

