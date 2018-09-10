// 删除文件夹
const fs = require('fs')

fs.rmdir('test', err => {
  if(err) throw err
  console.log('done');
})

// 记住要写回调函数哦～