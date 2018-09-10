## path

path 模块提供了一些工具函数，用于处理文件与目录的路径。可以通过以下方式使用：

```
const path = require('path');
```

- [path](#path)

path.normalize() 方法会规范化给定的 path，并解析 '..' 和 '.' 片段。


- [path.join([...paths])](http://nodejs.cn/api/path.html#path_path_join_paths)

path.join() 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。

长度为零的 path 片段会被忽略。 如果连接后的路径字符串是一个长度为零的字符串，则返回 '.'，表示当前工作目录。

- [path.resolve([...paths])](http://nodejs.cn/api/path.html#path_path_resolve_paths)

path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。

给定的路径的序列是从右往左被处理的，后面每个 path 被依次解析，直到构造完成一个绝对路径。 例如，给定的路径片段的序列为：/foo、/bar、baz，则调用 path.resolve('/foo', '/bar', 'baz') 会返回 /bar/baz。
如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录会被用上。

生成的路径是规范化后的，且末尾的斜杠会被删除，除非路径被解析为根目录。

长度为零的 path 片段会被忽略。

如果没有传入 path 片段，则 path.resolve() 会返回当前工作目录的绝对路径。

- [path.basename(path[, ext])](http://nodejs.cn/api/path.html#path_path_basename_path_ext)
- [path.dirname(path)](http://nodejs.cn/api/path.html#path_path_dirname_path)
- [path.extname(path)](http://nodejs.cn/api/path.html#path_path_extname_path)

- [path.format(pathObject)](http://nodejs.cn/api/path.html#path_path_format_pathobject)

path.format() 方法会从一个对象返回一个路径字符串。 与 [path.parse()](http://nodejs.cn/api/path.html#path_path_parse_path) 相反。

- [path.sep](http://nodejs.cn/api/path.html#path_path_sep)

提供了平台特定的路径片段分隔符：

  - Windows 上是 ``\``
  - POSIX 上是 ``/``

- [path.delimiter](http://nodejs.cn/api/path.html#path_path_delimiter)

提供平台特定的路径分隔符：

  - Windows 上是 ;
  - POSIX 上是 :

``__dirname``、``__filename``总返回文件的据对路径

``process.cwd()``总返回执行node命令所在文件夹