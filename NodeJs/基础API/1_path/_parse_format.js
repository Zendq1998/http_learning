const { parse, format } = require('path');

const filePath = 'usr/local/node_modules/n/package.json';

const ret = parse(filePath);

console.log(ret);
// { root: '',
//   dir: 'usr/local/node_modules/n',
//   base: 'package.json',
//   ext: '.json',
//   name: 'package' }

console.log(format(ret));
