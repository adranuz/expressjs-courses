import fs from 'fs';
import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import { log } from 'console';
import { MongoLogDataSource } from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
describe('file-system.datasource', () => {
  const logPath = path.join(__dirname, '../../../logs')
  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true})
  })
  test('should create log files if they do not exists', () => {
    // Arrange
    new FileSystemDatasource()
    const files = fs.readdirSync(logPath)

    expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
  })

  test('should save a log in all-logs file', () => {
    // Arrange
    const logDatasource = new FileSystemDatasource()
    // Act
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.low,
      origin: 'test'
    })
    logDatasource.saveLog(log)
    const allLogs = fs.readFileSync(logPath+'/logs-all.log', 'utf-8')
    // Assert
    expect(allLogs).toEqual(`${JSON.stringify(log)}\n`)
  })

  test('should save a log in medium-logs file', () => {
    // Arrange
    const logDatasource = new FileSystemDatasource()
    // Act
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.medium,
      origin: 'test'
    })
    logDatasource.saveLog(log)
    const allLogs = fs.readFileSync(logPath+'/logs-all.log', 'utf-8')
    const mediumLogs = fs.readFileSync(logPath+'/logs-medium.log', 'utf-8')
    // Assert
    expect(allLogs).toEqual(`${JSON.stringify(log)}\n`)
    expect(mediumLogs).toEqual(`${JSON.stringify(log)}\n`)
  })

  test('should save a log in high-logs file', () => {
    // Arrange
    const logDatasource = new FileSystemDatasource()
    // Act
    const log = new LogEntity({
      message: 'test',
      level: LogSeverityLevel.high,
      origin: 'test'
    })
    logDatasource.saveLog(log)
    const allLogs = fs.readFileSync(logPath+'/logs-all.log', 'utf-8')
    const highLogs = fs.readFileSync(logPath+'/logs-high.log', 'utf-8')
    // Assert
    expect(allLogs).toEqual(`${JSON.stringify(log)}\n`)
    expect(highLogs).toEqual(`${JSON.stringify(log)}\n`)
  })

  test('should read logs by priority', async () => {
    // Arrange
    const logDatasource = new FileSystemDatasource()
    const log = {
      message: 'test',
      origin: 'test'
    }
    const logHigh = new LogEntity({ level: LogSeverityLevel.high, ...log })
    const logLow = new LogEntity({ level: LogSeverityLevel.low, ...log })
    const logMedium = new LogEntity({ level: LogSeverityLevel.medium, ...log })
    // Act
    logDatasource.saveLog(logHigh)
    logDatasource.saveLog(logLow)
    logDatasource.saveLog(logMedium)
    const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high)
    const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium)
    const logsLow = await logDatasource.getLogs(LogSeverityLevel.low)
    // Assert
    // console.log(logsHigh)
    expect(logsHigh).toEqual(expect.arrayContaining([logHigh]))
    expect(logsMedium).toEqual(expect.arrayContaining([logMedium]))
    expect(logsLow).toEqual(expect.arrayContaining([logHigh, logLow, logMedium]))
  })

  test('should not throw an error if path exists', async () => {
    // Arrange
    new FileSystemDatasource()
    new FileSystemDatasource()
    // Act
    // Assert
  })

  test('should throw an error if level not exists', async () => {
    // Arrange
    const logDatasource = new FileSystemDatasource()
    const customSeverityLevel = 'not-exists' as LogSeverityLevel
    try {
      // Act
      await logDatasource.getLogs(customSeverityLevel)
      expect(true).toBe(false)
    } catch (error) {
      // console.log(error+'')
      expect(error+'').toBe('Error: not-exists not implemented')
      
    }
    // Assert
  })
})