import 'dotenv/config'
import { get } from 'env-var'

//  se obtienen las env vars y se verifican que sean correctas en tipo
export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').required().default('public').asString(),
}