import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
// abstract me permite decir que no quiero que se puedan crear instancias de esta clase
// sirve para definir comportamientos, muy parecidos a las interfaces
export abstract class LogRepository {
  abstract saveLog(log: LogEntity): Promise<void>
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>
}