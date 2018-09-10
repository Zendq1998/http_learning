const EventEmitter = require('events')

class CustomEmitter extends EventEmitter{}

const ce = new CustomEmitter()

function fn1() {
  console.log('fn1');
}

function fn2() {
  console.log('fn2');
}

ce.on('test', fn1)
ce.on('test', fn2)

setInterval(() => {
  ce.emit('test')
}, 500)

setTimeout(() => {
  ce.removeListener('test', fn1)
}, 2000)

setTimeout(() => {
  ce.removeAllListeners('test')
}, 5000)