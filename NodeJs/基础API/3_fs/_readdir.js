// 读取文件夹下的文件
const fs = require('fs')

fs.readdir('./', (err, file) => {
  if(err) throw err;
  console.log(file);
})