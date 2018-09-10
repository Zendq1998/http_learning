console.log(Buffer.alloc(10));
// <Buffer 00 00 00 00 00 00 00 00 00 00>

console.log(Buffer.alloc(10, 1));
// <Buffer 01 01 01 01 01 01 01 01 01 01>

console.log(Buffer.allocUnsafe(10));
// <Buffer 00 00 00 00 24 78 00 00 a1 4c>

console.log(Buffer.from([1,2,3]));
//  <Buffer 01 02 03>

console.log(Buffer.from('test'));
//  <Buffer 74 65 73 74>

console.log(Buffer.from('test', 'base64'));
// <Buffer b5 eb 2d>