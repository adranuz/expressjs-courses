import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";


// abstract me permite decir que no quiero que se puedan crear instancias de esta clase


// sirve para definir comportamientos, muy parecidos a las interfaces
describe('LogDatasource', () => {
  // mock de logDatasource, no es importante lo que hagan los metodos
  // es importante que sigan la interfaz
  const littleLog = new LogEntity({
    message: 'test',
    level: LogSeverityLevel.low,
    origin: 'test'
  })
  class MockLogDatasource implements LogDatasource{
    async saveLog(log: LogEntity): Promise<void> {
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [littleLog]
    }
  }
  test('should test the abstract class', async () => {
    // Arrange
    const mockLogDatasource = new MockLogDatasource()
    // Act
    // Assert
    // verifica que sea una instancia de LogDatasource
    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource)
    expect(mockLogDatasource).toHaveProperty('saveLog')
    expect(mockLogDatasource).toHaveProperty('getLogs')

    await mockLogDatasource.saveLog(littleLog)
    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.low)
    expect(logs.length).toEqual(1)
    expect(logs[0]).toBeInstanceOf(LogEntity)
  })

})
