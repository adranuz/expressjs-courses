import express from 'express';
import path from 'path';


interface Options {
  PORT: number;
  PUBLIC_PATH: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    this.port = options.PORT
    this.publicPath = options.PUBLIC_PATH
  }

  async start() {

    // middleware

    // Public Folder
    this.app.use(express.static(this.publicPath))

    // sirviendo una app de react SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname, `./../../${this.publicPath}/index.html`)

      console.log(req.url)
      res.send(indexPath)
      return
    })

    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`)
    })
  }
}