import { ServerApp } from "./presentation/server-app"

describe('Test app.ts', () => {
  test('should call Server.run with values', async () => {
    // Arrange:
    const serverRunMock = jest.fn()
    ServerApp.run = serverRunMock
    process.argv = ['node', 'app.ts', '-b', '10', '-l', '10', '-s', '-n', 'custom', '-d', 'custom-outputs']
    // Act:
    await import('./app') // corre el main
    // Assert:
    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 10,
      showTable: true,
      fileName: 'custom',
      fileDestination: 'custom-outputs'
    })
  })
})