import 'dotenv/config'
import { get } from 'env-var'

//  se obtienen las env vars y se verifican que sean correctas en tipo
//* probar envs
export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').required().default('public').asString(),
  POSTGRES_URL: get('POSTGRES_URL').required().default('public').asUrlString(),
}