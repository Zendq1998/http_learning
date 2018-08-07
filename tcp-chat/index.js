const net = require('net')

// 追踪连接数
let count = 0

// 创建服务器
const server = net.createServer(conn => {
  conn.write(
    '\n > welcome to \033[92mnode-chat\033[39m!'
  + '\n > ' + count + ' other people are connect at this time.\n > please write your name and press enter: '
  )
  count ++
  conn.on('end', () => {
    count --
    console.log("close")
  })
})

// 监听
server.listen(3000, () => {
  console.log("server listening on *:3000")
})