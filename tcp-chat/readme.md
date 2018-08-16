这是一个基于TCP的聊天程序。

### 创建连接

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

### 接受连接

我们先在外层作用域添加一个计数器：

```js
// 追踪连接数
let count = 0
```

接着，我们需要修改回调函数内容，把计数器递增的逻辑添加上去：

```js
const server = net.createServer(conn => {
  conn.write(
    '\n > welcome to \033[92mnode-chat\033[39m!'
  + '\n > ' + count + ' other people are connect at this time.\n > please write your name and press enter: '
  )
  count ++
})
```

重启服务器之后再次通过telent进行连接：

![](https://github.com/Zendq1998/http_learning/blob/master/tcp-chat/img/4.png?raw=true)


如图所示：当开启第二个终端连接进去之后，``count``就增加了一个！

![](https://github.com/Zendq1998/http_learning/blob/master/tcp-chat/img/5.png?raw=true)

当客户端请求关闭连接时，计数器变量就进行递减操作：

```js
conn.on('close', () => {
  count --
})
```

当底层套接字关闭时，会触发``close``事件。

### data事件

我们来看看如何处理客户端发送的数据。首先要处理的是用户输入的昵称（nickname），所以，我们从监听data事件开始。
为了测试，我们在服务器端的控制台打印客户端发来的数据。

```js
conn.on('data', (data) => {
  console.log(data)
})
```

![](https://github.com/Zendq1998/http_learning/blob/master/tcp-chat/img/6.png?raw=true)

![](https://github.com/Zendq1998/http_learning/blob/master/tcp-chat/img/7.png?raw=true)

如图所示，当我们输入数据并按下回车后，服务器端的控制台就直接将数据打印出来了，不过这个数据是客户端发送来的数据对应的Buffer对象。客户端传来的数据是``'zdq'``每一个字符按照ASCII编码对应的十六进制正好就是服务端打印出来的前三个``7a``、``64``、``71``。这也正说明了TCP协议是面向字节的特性：TCP对字符是完全无知的，因为不同的编码会导致传输的字节数不同，所以TCP允许数据以ASCII字符（每一个字符一个字节）或者Unicode（即每个字符四个字节）进行传输。

想要获取字符串形式的数据，可以通过``net.Stream#setEncoding``方法来设置编码：

```js
// index.js
conn.setEncoding('utf8')
```

效果在这里就不做展示了，大家可以自己去试一下～

至此，我们已经可以让客户端和服务器进行交互了，接下来我们要让更多的客户端加入聊天。

### 状态以及记录连接情况

此前定义的计数器通常称为状态。因为，在本例中，两个不同连接的用户需要修改同一个状态变量，在Node中成为共享状态的并发。

为了能够向其他连接进来的客户端发送和广播消息，我们需要对该状态进行拓展，来追踪到底谁连接进来了。

当客户端输入了昵称之后，就认为该客户端已经连接成功，并可以接受消息了。

首先，我们要记录设置了昵称的用户，因此引入一个新的状态变量，``users``：

```js
let users = {}
```

然后，在每一个连接中引入一个nickname变量：

```js
// 当前连接昵称
  let nickname
  ...
   // 监听用户输入事件
  conn.on('data', (data) => {
    // 接收到数据时，将\r\n(相当于按下回车键)清除
    // 删除回车符
    data = data.replace('\r\n', '')
    console.log(data)
    // 用户第一次输入并回车
    if (!nickname) {
      if (users[data]) {
        // user中已经存在data字段
        conn.write(
          '\033[93m> This nickname already in use. Please try agin:\033[39m '
        )
        return
      }
      else {
        nickname = data
        // 通过该连接nickname作为索引，把该连接的流对象存入全局共享的users状态中
        users[nickname] = conn
        // 通知所有连接客户端来新人了～
        for(let i in users) {
          users[i].write(
            '\033[90m > ' + nickname + ' joined the room\033[39m\n'
          )
        }
      }
    }
    // 用户已经完成用户名注册，接下来就是聊天消息，需要显示给其他客户端：
    else {
      for (i in users) {
        // 判断语句确保消息只发送给除了自己以外其他客户端
        if (i != nickname) {
          users[i].write(
            '\033[96m > ' + nickname + ':\033[39m ' + data + '\n'
          )
        }
      }
    }
  })
```

下图展示了两个客户端连接服务器之后相互聊天的场景：

![](https://github.com/Zendq1998/http_learning/blob/master/tcp-chat/img/8.jpg?raw=true)


### 进一步完善此程序

我们先把给所有用户广播消息的的这部分逻辑抽出来（第二个参数代表是否需要对自己发送），这样以后就可以更好地复用这段代码：

```js
// 广播通知其他用户信息
function broadcast (msg, exceptMyself) {
  for (let i in users) {
    if (!exceptMyself || i != nickname) {
      users[i].write(msg)
    }
  }
}
```

把之前写的广播部分都用这个方法替换掉，简单易懂，一目了然：

```js
//..
broadcast('\033[90m > ' + nickname + ' joined the room\033[39m\n')
//..
broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n', true)
```

当有人断开连接时（mac上关闭telnet连接是按``control + ]``回到telnet命令后，再输入``quit``命令即可断开连接），我们清除数组中对应的元素：

```js
// 用户断开连接的监听事件
  conn.on('close', () => {
    count --
    console.log("close")
    delete users[nickname]
  })
```

然后利用上面的``broadcast``方法为所有剩下的用户广播某人离开的信息：

```js
//...
broadcast('\033[90m > ' + nickname + ' left the room\033[39m\n')
```

这样以来，当有用户断开连接时，剩下的所有人就会收到他离开的消息。

完成～


### 一个IRC客户端程序

在成功实现了一个TCP服务器之后，我们进一步利用node实现一个TCP客户端。

IRC是因特网中继聊天(Internet Relay Chat)的缩写，它也是一项常用的基于TCP的协议。

持续更新～



