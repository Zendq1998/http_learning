## events (事件)

NodeJs的核心两个特性，一个是事件驱动、一个是异步IO。

大多数Node.js核心API都采用惯用的异步事件驱动架构，其中某些类型的对象（触发器）会周期性地触发命名事件来调用函数对象（监听器）。

所有能触发事件的对象都是EventEmitter类的实例。这些对象开房了一个EventEmitter.on()函数，允许将一个或多个函数绑定到会被对象触发的命名事件上。

[文档](http://nodejs.cn/api/events.html)