import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber() || 3000,
  DISCORD_WEBHOOK_URL: get('DISCORD_WEBHOOK_URL').required().asString(),

  // aws
  AWS_ACCESS_KEY_ID: get('AWS_ACCESS_KEY_ID').asString(),
  AWS_SECRET_ACCESS_KEY: get('AWS_SECRET_ACCESS_KEY').asString(),
  AWS_DEFAULT_REGION: get('AWS_DEFAULT_REGION').asString(),
  AWS_BUCKET: get('AWS_BUCKET').asString(),
  AWS_USE_PATH_STYLE_ENDPOINT: get('AWS_USE_PATH_STYLE_ENDPOINT').asString(),

  // github SECRET
  SECRET_TOKEN: get('SECRET_TOKEN').required().asString()
}