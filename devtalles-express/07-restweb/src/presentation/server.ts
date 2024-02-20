import express, { Router } from 'express';
import path from 'path';


interface Options {
  PORT: number;
  PUBLIC_PATH: string;
  router: Router
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;

  constructor(options: Options) {
    this.port = options.PORT
    this.publicPath = options.PUBLIC_PATH
    this.router = options.router
  }

  async start() {

    // middleware
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded

    // Public Folder
    this.app.use(express.static(this.publicPath))

    // API
    this.app.use(this.router)

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