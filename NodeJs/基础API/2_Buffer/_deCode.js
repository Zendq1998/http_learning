const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder('utf8')

const buf = Buffer.from('中文字符串！ ');

for (let i = 0; i < buf.length; i += 5 ) {
  const b = Buffer.allocUnsafe(5);
  buf.copy(b, 0, i);
  console.log(b.toString());
  // 中�
  console.log(decoder.write(b));
  // 中 （decoder会把组成不了中文的二进制数先缓存起来）
}