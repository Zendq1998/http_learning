// 监听文件（夹）中的变化
const fs = require('fs')

fs.watch('./', {
  recursive: true,
  // 是否坚持递归
},(eventType, filename) => {
  console.log(eventType, filename);
})

