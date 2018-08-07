const net = require('net')

// 创建服务器
const server = net.createServer(conn => {
  console.log("new connection!")
})

// 监听
server.listen(3000, () => {
  console.log("server listening on *:3000")
})