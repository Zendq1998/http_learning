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

启动这两个服务器，再让本地的浏览器去访问``localhost:8888``（即``server1``）：

![](https://github.com/Zendq1998/http_learning/blob/master/%E4%B8%80%E4%B8%AA%E5%B0%8F%E4%BE%8B%E5%AD%90%E7%90%86%E8%A7%A3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98/img/1.png?raw=true)

可以看到，服务器为我们返回了``index.html``这个页面，同时，这个页面的``script``标签中有一个向本地``8887``端口发送的ajax请求。也就是说，现在，我们的``localhost:8888``页面向``localhost:8887``去请求资源了，我们来看一下请求的结果：

![](https://github.com/Zendq1998/http_learning/blob/master/%E4%B8%80%E4%B8%AA%E5%B0%8F%E4%BE%8B%E5%AD%90%E7%90%86%E8%A7%A3%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98/img/2.png?raw=true)

因为浏览器同域限制的原因，``8888``端口是不可以请求``8887``端口的资源的。

### 解决方法1——服务器设置header

再来看一下浏览器的报错：``No 'Access-Control-Allow-Origin' header is present on the requested resourse``，这是一个服务端关于跨域设置的header属性，被请求的资源中没有出现这个请求头，所以``localhost:8888``不允许去获取该资源。

那我们就在被请求的服务器，也就是``server2``上设置这个header：

```js
// server2.js
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  })
```

现在重启服务器并刷新浏览器，可以看到控制台的报错消失了。

### 解决方法2——jsonp

