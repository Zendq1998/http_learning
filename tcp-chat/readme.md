这是一个基于TCP的聊天程序。

```js
// index.js
import net from "net";

// 创建服务器
const server = net.createServer(conn => {
  console.log("new connection!")
})

// 监听
server.listen(3000, () => {
  console.log("server listening on *:3000")
})
```

注意⚠️：上述代码中为``createServer``指定了一个回调函数。该函数在每次有新的连接的时候都会被执行。

我们来运行这一段代码：``node index.js``，启动了这个TCP服务器，当执行``listen``时，会将服务器绑定到``3000``端口，并在终端打印一段消息。

![](https://github.com/Zendq1998/http_learning/blob/master/tcp-chat/img/1.png?raw=true)

现在，让我们来用本地作为客户端，用telnet来进行连接：

![](https://github.com/Zendq1998/http_learning/blob/master/tcp-chat/img/2.png?raw=true)

再回到服务器的终端，会看到新的消息会打印出来，证明有新的连接。

![](https://github.com/Zendq1998/http_learning/blob/master/tcp-chat/img/3.png?raw=true)
