import { httpClientPlugin } from "../../src/plugins";

describe('plugins/http-client.plugin.ts', () => {
  /**
   * En esta prueba lo unico que se pretende es verificar que si se hagan las peticiones http como en un postman
   * Se puede utilizar cualquier api que devuelva un json
   * Si quisieras ser mas esctricto en el toBe puedes poner lo que te retorna en postman
   */
  test('httpClientPlugin.get() should return a string', async () => {
    // Assert:
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    // Act:
    const data = await httpClientPlugin.get(url)
    // Arrange:
    expect(typeof data).toBe('object')
    expect(data.id).toBe(1)
  })

  // Esta prueba solo verifica que existan los metodos del endpoint
  // no deberias probar el mensaje de error 'Not Implemented'
  // porque no es codigo que se va a usar en realidad.
  test('httpClientPlugin.post() should return a string', async () => {
    // Assert:
    // Act:
    // Arrange:
    expect(typeof httpClientPlugin.delete).toBe('function')
    expect(typeof httpClientPlugin.get).toBe('function')
    expect(typeof httpClientPlugin.patch).toBe('function')
    expect(typeof httpClientPlugin.post).toBe('function')
    expect(typeof httpClientPlugin.put).toBe('function')
  })
})
