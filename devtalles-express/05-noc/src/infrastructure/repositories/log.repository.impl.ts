import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {
    constructor(
      private readonly logDatasource: LogDatasource // <-- el acceso a una db
    ) {}

    async saveLog(log: LogEntity) {
      return await this.logDatasource.saveLog(log);
    }

    async getLogs(severityLevel: LogSeverityLevel) {
      return await this.logDatasource.getLogs(severityLevel);
    }
}