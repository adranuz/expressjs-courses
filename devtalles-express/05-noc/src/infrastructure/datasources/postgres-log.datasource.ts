import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogDatasource } from "../../domain/datasources/log.datasource";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
}
export class PostgresLogDataSource implements LogDatasource {
	async saveLog(log: LogEntity) {
    // const newLog = new LogEntity(log)
    const createdLog = await prismaClient.logModel.create({
      data: {
        message: log.message,
        level: severityEnum[log.level],
        origin: log.origin
      }
    });
  }
	async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel]
    const logs = await prismaClient.logModel.findMany({
      where: {
        level
      }
    });
		return logs.map(LogEntity.fromObject);
	}
}
