import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  // rutas donde voy a guardar los logs
  private readonly logPath = 'logs'
  private readonly allLogsPath = 'logs/logs-all.log'
  private readonly mediumLogsPath = 'logs/logs-medium.log'
  private readonly highLogsPath = 'logs/logs-high.log'

  // asegurarme que las rutas existan
  constructor () {
    this.createLogFiles()
  }

  private createLogFiles = () => {
    if (!fs.existsSync(this.logPath)) fs.mkdirSync(this.logPath)

    const logFilesArray = [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ]
    logFilesArray.forEach((path: string) => {
      if (!fs.existsSync(path)) fs.writeFileSync(path, '')
    })

  }

  // estos metodos son extraidos de la interfaz LogDatasource
  async saveLog(newLog: LogEntity): Promise<void> {
    // appendFileSync: agrega una linea al final del archivo
    const logAsJson = `${JSON.stringify(newLog)}\n`
    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    }
    if (newLog.level === LogSeverityLevel.high) {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  private getLogsFromFile = async (path: string): Promise<LogEntity[]> => {
    const content = fs.readFileSync(path, 'utf-8') // leer el archivo
    const logs: Promise<LogEntity>[] = content.split('\n')
      .filter(log => log.trim() !== '') // separa los logs por salto de linea
      .map(async (log: string) => await LogEntity.fromJSON(log)) // convierte el string a un objeto
    return Promise.all(logs);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return await this.getLogsFromFile(this.allLogsPath)
      case LogSeverityLevel.medium:
        return await this.getLogsFromFile(this.mediumLogsPath)
      case LogSeverityLevel.high:
        return await this.getLogsFromFile(this.highLogsPath)
      default:
        throw new Error(`${severityLevel} not implemented`)
    }
  }

}