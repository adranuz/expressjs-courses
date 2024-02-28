import { envs } from "../src/config/envs"
import { Server } from "../src/presentation/server"


// ahora Server es un mock
jest.mock('../src/presentation/server')


describe('App', () => {
  // solo queremos que el main sea llamado
  test('should call server with arguments and start', async () => {
    // importamos app.ts de manera global
    await import('../src/app')

    expect(Server).toHaveBeenCalledTimes(1)
    expect(Server).toHaveBeenCalledWith(expect.objectContaining({
      PORT: envs.PORT,
      PUBLIC_PATH: envs.PUBLIC_PATH,
    }))
    expect(Server.prototype.start).toHaveBeenCalledTimes(1)
  })
})