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



### 连接

要是对比一下TCP服务器和HTTP服务器的实现，你可能会注意到它们很相似：都调用了``createServer``方法，并且当客户端连入时都会执行一个回调函数。

不过它们有个本质的区别，即回调函数中对象的类型。在net服务器中，是连接（``connection``）对象，而在HTTP服务器中，则是连接和请求对象。

之所以会这样，原因有两个，其一，HTTP服务器是更高层的API，提供了控制和HTTP协议相关的一些功能。其二，浏览器在访问站点时不会就只用一个连接。很多主流的浏览器为了更快地加载网站内容，能向同一个主机打开八个不同的连接，并发送请求。

在Node中，尽管我们可以通过``req.connection``获取TCP连接对象，但是我们在大多数情况下是和请求和相应打交道。

默认情况下，为了提高性能，Node会告诉浏览器始终保持连接，通过它发送更多的请求。这是通过此前我们看到的``Connection``头信息中``keep-alive``值来通知浏览器的。

### 数据

当发送``HTML``时，需要随着响应体定义``Content-Type``头信息。

和相应消息一样，请求消息也需要包含``Content-Type``头信息。 为了更有效地处理表单，这两部分信息是不可或缺的。

```js
// ./Server2/server.js
http.createServer((req, res) => {
  if ('/' == req.url) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(
      `
        <form method="POST" action="/url">
          <h1>My form</h1>
          <fieldset>
            <label>Personal information</label>
            <p>What is your name</p>
            <input type="text" name="name">
            <p><button>Submit</button></p>
          </fieldset>
        </form>
      `
    )
  } else if ('/url' == req.url) {
    let body = ''
    req.on('data', chunk => {
      body += chunk
    })
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(
        `
          <p>Content-Type: ${req.headers['content-type']}</p>
          <p>Data:</p>
          <pre>${body}</pre>
        `
      )
    })
  }
}).listen(3001)
```

我们监听了``data``和``end``事件。创建了一个body字符串用来接受数据块，仅当``end``事件触发时，我们就知道数据接收完全了。

之所以可以这样逐块接收数据，时因为``Node.js``允许在数据到达服务器时就可以对其进行处理。因为数据是以TCP包到达服务器的，这和现实情况也完全匹配，我们先获取一部分数据，然后在某个时刻再获取其余的数据。

提交表单，相应结果：

![](https://github.com/Zendq1998/http_learning/blob/master/HTTP/img/4.png?raw=true)

### 整合

Node.js提供了一个``querystring``的模块，可以方便地对类似``name=aaa``的字符串进行解析：

```js
console.log(require('querystring').parse('name=Guillermo'));
```

打印结果：

```js
{name: 'Guillermo'}
```

我们可以通过这个方法来把我们得到的字符串解析成我们想要的格式。


