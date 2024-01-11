Un proyecto para entender webhooks

### Encender el webhook
1. El proyecto debe tener un archivo `.env` con las siguientes variables:
```
PORT=3000
```
2. Tienes que levantar el proyecto con `npm run dev`
3. Tienes que tener un servidor público para que github pueda hacer el POST. Puedes usar [ngrok](https://ngrok.com/) para esto.
4. Si usas ngrok, debes ejecutarlo con `ngrok http 3000` y copiar la url que te da, y darsela a github en la configuración del webhook.
```
ngrok http 3000
```
5. La url que es generada por ngrok es la que debes poner en la configuración del webhook de github.




### autentificacion con aws mediante secret manager
[aws nodejs secret](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html)

### Video curso sobre webhooks
[webhooks](https://www.youtube.com/watch?v=41NOoEz3Tzc)