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

![](https://github.com/Zendq1998/http_learning/blob/master/HTTP/img/1.png?raw=true)

### 头信息

HTTP协议目的是进行文档交换。它在请求和相应消息前使用头信息（header）来描述不同的消息内容。

例如，Web页面会分发许多不同类型的内容：文本（text）、HTML、XML、JSON、PNG、JPEG等等。

发送内容的类型（type）就是在``Content-Type``头信息中标注的。

举个例子，我们回到刚刚的服务器，在返回的数据中加一点``HTML``:

```js
const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200)
  res.end('hello <b>world</b>!')
}).listen(3000)
```

这次我们用浏览器通过http访问

![](https://github.com/Zendq1998/http_learning/blob/master/HTTP/img/2.png?raw=true)

可见，浏览器将相应结果作为纯文本来处理了，这是因为HTTP客户端（浏览器）并不知道服务器发送过来的内容是什么类型，我们没有把这部分信息告诉浏览器。于是浏览器就会默认地认为它看到的内容是``text/plain``类型，也就是普通文本类型，就不会将它作为HTML来渲染了。

我们把代码稍作修改，加入正确的头信息，就可以了。

```js
const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200,{ 'Content-Type': 'text/html' })
  res.end('hello <b>world</b>!')
}).listen(3000)
```

这时头信息里面包含在相应消息中。浏览器会对其进行解析，就能够正确地渲染出HTML了。

![](https://github.com/Zendq1998/http_learning/blob/master/HTTP/img/3.png?raw=true)


