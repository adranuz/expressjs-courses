import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
// desde aqui puedes hacer uso de servicios web
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

// el use-case contiene la facilidad de uso, es decir,
// no necesitas mas logica mas que usar uno y ya
export class CheckService implements CheckServiceUseCase{
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}
  // no es estatico porque le vamos a inyectar una dependencia
  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url)
      if (!req.ok) throw new Error(`Error on check service ${url}`)
      const log = new LogEntity({
        message:`Service ${url} working`,
        level: LogSeverityLevel.low,
        origin: 'por ahi'
      })
      this.logRepository.saveLog(log)
      this.successCallback && this.successCallback()
      return true
    } catch (error) {
      const errorMessage = `${error}`
      const log = new LogEntity({
        message: errorMessage, 
        level: LogSeverityLevel.high,
        origin: 'por ahi'
      })
      this.logRepository.saveLog(log)
      this.errorCallback && this.errorCallback(`${error}`)
      return false
    }
  }
}