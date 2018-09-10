// 有方向的数据，从一个设备流向另一个设备
const fs = require('fs')

const rs = fs.createReadStream('./_readstream.js')

rs.pipe(process.stdout)