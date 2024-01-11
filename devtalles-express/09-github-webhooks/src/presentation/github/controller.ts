import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {
  constructor(
    private readonly gitHubService = new GitHubService(),
    private readonly discordService = new DiscordService()
  ){}

  /**
  * Webhook: es un endpoint que usa un secret para autorizarse
  * Header: utiliza los headers para identificar quien hace la peticion
  * x-github-event: 'x-' es usado para headers personalizados
  */
  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.headers['x-github-event'] ?? 'unknown';
    const githubSignature = req.headers['x-hub-signature-256'] ?? 'unknown';
    const payload = req.body

    // console.log({payload});
    let message: string = 'aloooo';
    switch(githubEvent) {
      case 'star':
        message = this.gitHubService.onStar(payload)
      break

      case 'issues':
        message = this.gitHubService.onIssue(payload)
      break

      default:
        message = 'Unknown github event: ' + githubEvent
      break
    }
    console.log({message});
    this.discordService.notify(message)
      .then(() => res.status(202).send(message))
      .catch(err => res.status(500).send(err.message))
    // res.status(202).json(message)


  }
}