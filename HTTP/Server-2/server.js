const http = require('http')
const qs = require('querystring')

http.createServer((req, res) => {
  if ('/' == req.url) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(
      `
        <form method="POST" action="/url">
          <h1>My form</h1>
          <fieldset>
            <label>Personal information</label>
            <p>What is your name</p>
            <input type="text" name="name">
            <p><button>Submit</button></p>
          </fieldset>
        </form>
      `
    )
  } else if ('/url' == req.url) {
    let body = ''
    req.on('data', chunk => {
      body += chunk
    })
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(
        `
          <p>Content-Type: ${req.headers['content-type']}</p>
          <p>Data:</p>
          <pre>${body}Your name is ${qs.parse(body).name}</pre>

        `
      )
    })
  } else {
    res.writeHead(404)
    res.end('404 Not Found')
  }
}).listen(3001)

