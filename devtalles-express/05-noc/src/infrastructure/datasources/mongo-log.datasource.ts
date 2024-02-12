import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDatasource{
  async saveLog(log: LogEntity): Promise<void> {
    // LogModel no es una entidad, es un modelo de mongoose
    const newLog = await LogModel.create(log);
    console.log('Log saved in MongoDB', newLog.id);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({level: severityLevel});
    return logs.map(LogEntity.fromObject)
  }
}