import express from 'express'
import { envs } from './config'
import { GithubController } from './presentation/github/controller'
import { AwsController } from './presentation/aws/controller'
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware'

(() => {
   main()
})()



function main() {
  const app = express()
  const githubController = new GithubController()
  const awsController = new AwsController()


  app.use(express.json()) // para manejar json en las peticiones

  app.use(GithubSha256Middleware.verifySignature)
  app.post('/api/github', githubController.webhookHandler)
  app.get('/api/secret', awsController.webhookHandler)

  app.listen(envs.PORT, () => {
    console.log('Server running on port ' + envs.PORT)
  })
}