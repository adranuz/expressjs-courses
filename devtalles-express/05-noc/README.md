# Proyecto NOC
El objetivo es crear una serie de tareas usando Arquitectura Limpia con Typescript y Node.js.

## dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
```shell
  MAILER_EMAIL=garciasaaib@gmail.com
  MAILER_SECRET_KEY=123456
  PORT=3000
  ENV=development
```
3. Ejecutar el comando npm install
4. Levantar las bases de datos con el comando `docker compose up -d`
5. Ejecutar `npm run dev`


## up DB
```shell
docker-compose up -d
```

## contraseña de aplicacion de correo
[password app]('https://myaccount.google.com/u/0/apppasswords?pli=1&rapt=AEjHL4P2gMn8lwRARTxg9w3RRhYW3aZTWFIKg1K_N4zccJNGZGvQiJWzdEPUwxRMEzgpDkUfdEPeNrDC2u6ox04ZyZVpNz0cI_3xV7_zDLR82AAJnjwAUPE')




## descripcion de librerias
### Produccion
  - cron: la libreria cron se utiliza para programar tareas en un tiempo determinado
  - dotenv: para leer el archivo .env
  - env-var: para validar las variables de entorno en tipo y dato
  - nodemailer: manejador de correos
  - prisma: ORM para la base de datos relacionales