const fs = require('fs')

fs.readFile('./_readfile.js', 'utf8', (err, data) => {
  if (err) {
    throw err
  }
  console.log(data.toString());
})

const data = fs.readFileSync('./readme.md', 'utf8')
// 同步
console.log(data);
