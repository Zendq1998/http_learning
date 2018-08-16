const net = require('net')

// 追踪连接数
let count = 0

// 用户状态
let users = {}

// 创建服务器
const server = net.createServer(conn => {
  // 广播通知其他用户信息
  function broadcast (msg, exceptMyself) {
    for (let i in users) {
      if (!exceptMyself || i != nickname) {
        users[i].write(msg)
      }
    }
  }

  // 设置接收到数据的编码
  conn.setEncoding('utf8')

  // 当前连接昵称
  let nickname

  conn.write(
    '\n > welcome to \033[92mnode-chat\033[39m!'
  + '\n > ' + count + ' other people are connect at this time.\n > please write your name and press enter: '
  )
  count ++

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
        broadcast('\033[90m > ' + nickname + ' joined the room\033[39m\n')
      }
    }
    // 用户已经完成用户名注册，接下来就是聊天消息，需要显示给其他客户端：
    else {
      broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n', true)
    }
  })

  // 用户断开连接的监听事件
  conn.on('close', () => {
    count --
    console.log("close")
    delete users[nickname]
    broadcast('\033[90m > ' + nickname + ' left the room\033[39m\n')
  })
})

// 监听
server.listen(3000, () => {
  console.log("server listening on *:3000")
})
