import { CronJob } from "cron";
type CronTime = string | Date
type OnTick = () => void

export class CronService {
  // static porque solo queremos usar un metodo de la clase
  public static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    const job = new CronJob(cronTime, onTick)
    return job
  }
}