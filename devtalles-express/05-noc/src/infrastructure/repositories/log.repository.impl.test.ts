import { LogDatasource } from "../../domain/datasources/log.datasource"
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"
import { LogRepositoryImpl } from "./log.repository.impl"

describe('log.repository.impl.test.ts', () => {
  const mockLogDatasource: LogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  }
  const logRepository = new LogRepositoryImpl(mockLogDatasource)

  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('saveLog should call the datasource with arguments', async () => {
    // Arrange
    const log = {message: 'test', level: 'low', origin: 'test'} as LogEntity
    // Act
    await logRepository.saveLog(log)
    // Assert
    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log)
  })

  test('getLogs should call the datasource with arguments', async () => {
    // Arrange
    const lowSeverity = LogSeverityLevel.low
    // Act
    await logRepository.getLogs(lowSeverity)
    // Assert
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity)
  })
})