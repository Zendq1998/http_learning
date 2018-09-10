const path = require('path');

console.log('__dirname    ', __dirname);
console.log('process.cwd()', process.cwd());
console.log('./           ', path.resolve('./'));

// 尝试在不同的路径去执行，看看打印的结果


