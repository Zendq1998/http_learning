const fs = require('fs')

fs.stat('./_stat.js', (err, data) => {
  if (err) {
    throw err
    console.log('文件不存在');
  };
  console.log(data.isFile());
  console.log(data.isDirectory());
  console.log(data);
  
})