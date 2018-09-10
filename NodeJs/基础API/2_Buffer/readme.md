## Buffer

Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在被创建时确定，且无法调整。

Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require('buffer').Buffer。

[Buffer的实例化](http://nodejs.cn/api/buffer.html#buffer_buffer_from_buffer_alloc_and_buffer_allocunsafe)


[Buffer类的方法](./_class.js)

[实例化之后第方法](./_instance.js)
- 因为Buffer 类的实例类似于整数数组，所以和数组第方法很相似

[关于中文编码第问题](./_deCode.js)
一个中文字符的长度是3哥字节，当我们5个5个字节去读取中文字符串第时候，就会乱码，这个时候我们可以像例子中那样用``StringDecoder``。