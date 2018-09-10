/*
buf.length
buf.toString()
buf.fill()
buf.equals()
buf.indexOf()
buf.copy()
*/

const buf1 = Buffer.from('This is a test!');
console.log(buf1.length);
// 15

const buf2 = Buffer.alloc(10)
console.log(buf2.length);
// 10

console.log(buf1.toString('base64'));

const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);
console.log(buf3.fill(10,2,6));
// 从第2个开始填充到第6个为10（16进制为0a）
// <Buffer 01 c9 0a 0a 0a 0a 00 00 09 33>

const buf4 = Buffer.from('test')
const buf5 = Buffer.from('test')
const buf6 = Buffer.from('test!')

console.log(buf4.equals(buf5));
// true
console.log(buf4.equals(buf6));
// false

console.log(buf4.indexOf('es'));
// 1
console.log(buf4.indexOf('esa'));
// -1
// 很多方法都类似数组





