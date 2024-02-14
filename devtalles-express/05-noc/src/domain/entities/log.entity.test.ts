import { LogEntity, LogSeverityLevel } from "./log.entity"

describe('log.entity.test.ts', () => {
  const dataObj = {
    message: 'test',
    level: LogSeverityLevel.low,
    origin: 'test'
  }
  test('should return LogEntity', () => {
    // Arrange
    // Act
    const log = new LogEntity(dataObj)
    // Assert
    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
    expect(log).toEqual(
      expect.objectContaining({
        message: 'test',
        level: LogSeverityLevel.low,
        origin: 'test',
        createdAt: expect.any(Date)
      })
    )
  })

  test('should return LogEntity from json', async () => {
    // Arrange
    const json = '{"level":"low","message":"Service https://google.com working","createdAt":"2024-02-12T17:35:40.680Z","origin":"por ahi"}'
    // Act
    const log = await LogEntity.fromJSON(json)
    // Assert
    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe("Service https://google.com working")
    expect(log.level).toBe(LogSeverityLevel.low)
    expect(log.origin).toBe("por ahi")
    expect(log.createdAt).toBeInstanceOf(Date)
  })

  test('should return LogEntity from object', () => {
    // Arrange
    // Act
    const log = LogEntity.fromObject(dataObj)
    // Assert
    expect(log).toBeInstanceOf(LogEntity)
    expect(log.message).toBe(dataObj.message)
    expect(log.level).toBe(dataObj.level)
    expect(log.origin).toBe(dataObj.origin)
    expect(log.createdAt).toBeInstanceOf(Date)
  })
})