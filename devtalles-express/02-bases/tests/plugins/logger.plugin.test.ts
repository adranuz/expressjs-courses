import { buildLogger, logger as pluginLogger } from "../../src/plugins"

/**
 * En este testing es importante resaltar que no vamos a evaluar a winston
 * sino que vamos a evaluar que nuestro plugin se comporte como esperamos.
 * Es deci, que los metodos que hemos construido con ayuda de winston funcionen como queremos.
 * - que buildLogger retorne un objeto con los metodos log y error
 * - probar que log y error son funciones
 * - probar que el resultado de estas funciones sea lo que queremos
 */
describe('plugins/logger.plugin.ts', () => {
  // esta funcion ayuda a mantener los metodos a pesar de los cambios en buildLogger
  test('buildLogger() should return an object with log and error methods', () => {
    // Assert:
    const service = 'test'
    // Act:
    const loggerCreated = buildLogger(service)
    // Arrange:
    expect(typeof loggerCreated).toBe('object')
    expect(typeof loggerCreated.log).toBe('function')
    expect(typeof loggerCreated.error).toBe('function')
  })

  test('log() should log a message', () => {
    // para hacer un mock de buildLoger, tenemos que obtener su funcion generadora: logger
    const loggerMock = jest.spyOn(pluginLogger, 'log')
    // Assert:
    const service = 'test service'
    const message = 'test message'
    // Act:
    const logger = buildLogger(service)
    logger.log(message)
    // Arrange: check that the log has all I need
    expect(loggerMock).toHaveBeenCalledWith(
      'info',
      expect.objectContaining({
        level: 'info',
        message,
        service
      })
    )
  })

  test('error() should log a message', () => {
    // para hacer un mock de buildLoger, tenemos que obtener su funcion generadora: logger
    const loggerMock = jest.spyOn(pluginLogger, 'log')
    // Assert:
    const service = 'test service'
    const message = 'test message'
    // Act:
    const logger = buildLogger(service)
    logger.error(message)
    // Arrange: check that the log has all I need
    expect(loggerMock).toHaveBeenCalledWith(
      'info',
      expect.objectContaining({
        level: 'info',
        message,
        service
      })
    )
  })
})