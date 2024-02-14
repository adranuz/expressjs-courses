import mongoose from "mongoose"
import { envs } from "../../../config/plugins/envs.plugins"
import { MongoDatabase } from "../init"
import { LogModel } from "./log.model"

/* podemos probar
- que sea un model
- que tenga los campos correctos
*/
describe('log.model.test.ts', () => {
  // Antes que nada, conectarse con la db
  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    })
  })
  // Despues de todo, cerrar la conexion
  afterAll(async () => {
    mongoose.connection.close()
  })
  test('should return LogModel', () => {
    expect(true).toBe(true)
  })
  test('should return LogModel', async () => {
    // Arrange:
    // creamos el log
    const logData = {
      message: 'test',
      level: 'low',
      origin: 'test'
    }
    // Act:
    // we record the log on db, and check it
    const log = await LogModel.create(logData)
    // console.log(log)
    // Assert:
    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        // createdAt: expect.any(Date),
        id: expect.any(String)
      })
    )
  })


  test('should return the schema object', async () => {
    // Arrange:
    const schema = LogModel.schema.obj
    // Act:
    // console.log(schema)
    // Assert:
    // verifica que los campos sean correctos conforme al schema
    expect(schema).toEqual(expect.objectContaining({
        message: { type: expect.any(Function), required: true },
        level: {
          type: expect.any(Function),
          enum: [ 'low', 'medium', 'high' ],
          default: 'low'
        },
        createdAt: expect.any(Object),
        origin: { type: expect.any(Function) }
    }))
  })
})