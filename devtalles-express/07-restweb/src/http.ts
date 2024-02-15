import http from 'http'
import fs from 'fs';

const server = http.createServer((req, res) => {
  console.log(req.url)
  
  // esta informacion es muy limitada por lo que usaremos otra cosa
  // res.write('Hello World')
  // res.end()
  
  // esto es un ejemplo de como se puede hacer una respuesta html
  // esto es llamado server side rendering, donde la respuesta es html
  // res.writeHead(200, { 'Content-Type': 'text/html' })
  // res.write('<h1>Hello World</h1>')
  // res.end()

  // en aplicaciones rest usualmente se responde con json
  // const data = {name : 'John Doe', age: 25, city : 'New York'}
  // res.writeHead(200, { 'Content-Type': 'application/json' })
  // res.write(JSON.stringify(data))

  // este es un web server
  // if(req.url === '/'){
  //   const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
  //   res.writeHead(200, { 'Content-Type': 'text/html' })
  //   res.write(htmlFile)
  //   res.end()
  //   return;
  // }
  // if(req.url?.endsWith('.css')){
  //   res.writeHead(200, { 'Content-Type': 'text/css' })
  // }else if (req.url?.endsWith('.js')){
  //   res.writeHead(200, { 'Content-Type': 'application/javascript' })
  // }



})

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})

