const fs = require('fs')

fs.rename('./text', 'text.txt', err => {
  if(err) throw err
  console.log('done!');
})