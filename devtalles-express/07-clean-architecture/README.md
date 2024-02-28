## clave privada y publica
Para poder utilizar http2 es necesario tener un certificado y una clave privada. Para generarlos se puede utilizar openssl.

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout localhost-privkey.pem -out localhost-cert.pem
## o
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

## dev
1. clonar el .env.template y crear el .env
2. ejecutar el comando ```docker compose up -d```



## DTO - reglas del crud de los endpoints


## recomendaciones en produccion
[link]('https://expressjs.com/en/advanced/best-practice-performance.html')

## prisma en testing
https://www.prisma.io/docs/orm/more/development-environment/environment-variables/using-multiple-env-files