const EventEmitter = require('events')

class CustomEvent extends EventEmitter {

}
// 继承

const ce = new CustomEvent()
// 实例化

ce.on('event', () => {
  console.log('触发了一个事件');
})

ce.emit('event')