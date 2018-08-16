超文本协议，又称为HTTP，是一种Web协议，它为Web注入了很多强大的功能，属于TCP上层协议。

### HTTP结构

HTTP协议构建在请求和相应的概念上，对应在``Node.js``种就是``http.ServerRequest``和``http.ServerRespopnse``这两个构造器构造出来的对象。

我们先用node创建一个简单的HTTP服务器，监听本地``3000``端口：

```js
const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200)
  res.end('hello world!')
}).listen(3000)
```

接着，建立一个``telnet``连接，并发送请求：

``GET / HTTP /1.1``

输入后，按下两次回车。