// 创建文件夹
const fs = require('fs')

fs.mkdir('test', err => {
  if(err) throw err
  console.log('done!');
})