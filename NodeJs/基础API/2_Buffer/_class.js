// Buffer类提供的属性和方法（不用实例化就可以使用的属性和方法，在有些语言中也叫做静态方法）

/*
Buffer.byteLength
Buffer.isBuffer()
Buffer.concat()
*/

console.log(Buffer.byteLength('test'));
// 4个字节

console.log(Buffer.byteLength('测试'));
// 一个中文字符用3个字节来表示、所以打印结果是6

console.log(Buffer.isBuffer({}));
// false
console.log(Buffer.isBuffer(Buffer.from([1,2,3])));
// true

const buf1 = Buffer.from('This ')
const buf2 = Buffer.from('is ')
const buf3 = Buffer.from('a ')
const buf4 = Buffer.from('test ')
const buf5 = Buffer.from('!')

const buf = Buffer.concat([buf1, buf2, buf3, buf4, buf5])
console.log(buf.toString());
// This is a test !