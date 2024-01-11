import { envs } from "../../config"

export class DiscordService {
  private readonly webhookUrl = envs.DISCORD_WEBHOOK_URL
  
  constructor(){}

  async notify(message: string) {
    const body = {
      content: message,
      embeds: [
        { image: { url: "https://media1.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif?cid=ecf05e47r0537dc1y2lla90l1tvtgpha1gufmfnspio61fal&ep=v1_gifs_search&rid=giphy.gif&ct=g" } }
      ]
    }
    const response = await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      throw new Error('DiscordService Error: ' + response.statusText)
    }
    return true
  }
}