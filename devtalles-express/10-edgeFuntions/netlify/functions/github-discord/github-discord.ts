import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const notify = async(message: string)  => {
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if(!discordWebhookUrl) {
    throw new Error("No se encontró la variable de entorno DISCORD_WEBHOOK_URL");
    // throw "No se encontró la variable de entorno MY_IMPORTANT_VARIABLE";
  }

  const body = {
    content: message,
    embeds: [
      { image: { url: "https://media1.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif?cid=ecf05e47r0537dc1y2lla90l1tvtgpha1gufmfnspio61fal&ep=v1_gifs_search&rid=giphy.gif&ct=g" } }
    ]
  }
  const response = await fetch(discordWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error('DiscordService Error: ' + response.statusText)
  }
  return true
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality
  const githubEvent = event.headers['x-github-event'] ?? 'unknown';
  const payload = JSON.parse(event.body || '{}')

  console.log(payload)


  // netlify puede acceder a las variables de entorno, por lo que no requiere dotenv
  await notify("Hello from Netlify Functions")


  console.log('Hello Variables')

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "done",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }
};

export { handler };