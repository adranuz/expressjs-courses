import { LogEntity } from '../../entities/log.entity';
import { CheckServiceMultiple } from './check-service-multiple';
describe('check-service', () => {
  const mockRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const successCallback = jest.fn()
  const errorCallback = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should return true on success', async () => {
    // Arrange
    const checkService = new CheckServiceMultiple(
      [mockRepository1, mockRepository2, mockRepository3],
      successCallback,
      errorCallback
    )
    // Act
    const wasOk = await checkService.execute('https://google.com')
    // Assert
    // prueba todos los aspectos de una peticion exitosa
    expect(wasOk).toBe(true)
    expect(successCallback).toHaveBeenCalled()
    expect(errorCallback).not.toHaveBeenCalled()
    expect(mockRepository1.saveLog).toBeCalledWith(expect.any(LogEntity))
  })

  test('should return false on error', async () => {
    // Arrange
    const checkService = new CheckServiceMultiple(
      [mockRepository1, mockRepository2, mockRepository3],
      successCallback,
      errorCallback
    )
    // Act
    const wasOk = await checkService.execute('https://goosdfasdgle.com')
    // Assert
    // prueba todos los aspectos de una peticion exitosa
    expect(wasOk).toBe(false)
    expect(successCallback).not.toHaveBeenCalled()
    expect(errorCallback).toHaveBeenCalled()
    expect(mockRepository1.saveLog).toBeCalledWith(expect.any(LogEntity))
  })
})