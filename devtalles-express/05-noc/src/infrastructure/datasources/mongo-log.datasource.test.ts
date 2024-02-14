import { envs } from "../../config/plugins/envs.plugins"
import { LogModel, MongoDatabase } from "../../data/mongo"
import mongoose from "mongoose"
import { MongoLogDataSource } from "./mongo-log.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"

describe('mongo-log.datasource', () => {
  const mongoLogDataSource = new MongoLogDataSource()
  const log = new LogEntity({
    level: LogSeverityLevel.high,
    message: 'Email log sent',
    origin: "send-email-logs.ts",
  })

  beforeAll(async() => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME
    })
  })
  afterAll(async() => {
    await LogModel.deleteMany()
    mongoose.connection.close()
  })
  test('should save log in mongo', async () => {
    // Arrange
    const logSpy = jest.spyOn(console, 'log')
    
    // Act
    await mongoLogDataSource.saveLog(log)
    // Assert
    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledWith(expect.any(String), expect.any(String))
  })
  test('should get logs from mongo', async () => {
    // Arrange
    await mongoLogDataSource.saveLog(log)
    // Act
    const logs = await mongoLogDataSource.getLogs(LogSeverityLevel.high)
    // Assert
    expect(logs.length).toBe(2)
    expect(logs[0].level).toBe(LogSeverityLevel.high)
  })
})