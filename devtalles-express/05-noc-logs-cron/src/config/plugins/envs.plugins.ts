import 'dotenv/config'
import * as env from 'env-var'

/**
 * Este plugin maneja las variables de entorno
 * - dotenv: facilita el obtener las variables de entorno
 * - env-var: valida los tipos de datos en las env vars
 */
export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
  ENV: env.get('ENV').required().asString(),

  // mongo
  MONGO_URL: env.get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
  MONGO_USER: env.get('MONGO_USER').required().asString(),
  MONGO_PASSWORD: env.get('MONGO_PASSWORD').required().asString(),
}