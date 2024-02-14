import http from 'http'

const server = http.createServer((req, res) => {
  console.log(req.url)
  
  // esta informacion es muy limitada por lo que usaremos otra cosa
  // res.write('Hello World')
  // res.end()
  
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write('<h1>Hello World</h1>')
  res.end()
})

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})

