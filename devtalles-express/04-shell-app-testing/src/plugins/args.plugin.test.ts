// import { args } from './args.plugin';

import { before } from 'node:test';

// funcion para agregar argumentos a process.argv
const runCommand = async (argsArray: string[]) => {
  process.argv = [...process.argv, ...argsArray]
  const {args} = await import('./args.plugin');
  return args
}
describe('args.plugin', () => {
  // esto se hace para resetear los args en cada test
  const originalArgs = process.argv
  beforeEach(() => {
    process.argv = originalArgs
    jest.resetModules()
  })

  // text para explicar
  // test('explain stuff', async () => {
  //   // Desde aqui ya podemos ver que en process tenemos argumentos
  //   console.log(process.argv);
  //   // aplicando el helper
  //   const args = await runCommand(['-b', '10', '-l', '10', '-s'])
  //   console.log(args);
  // })

  test('should return default values', async () => {
    // Arrange:
    // Act:
    const args = await runCommand(['-b', '10'])
    // Assert:
    // evaluate defult values + the ones passed
    expect(args).toEqual(expect.objectContaining({
      base: 10,
      limit: 10,
      show: false,
      name: 'table',
      destination: './outputs'
    }))
  })
  test('should return settled values', async () => {
    // Arrange:
    // Act:
    const args = await runCommand(['-b', '10', '-l', '10', '-s', '-n', 'custom', '-d', 'custom-outputs'	])
    // Assert:
    // evaluate defult values + the ones passed
    expect(args).toEqual(expect.objectContaining({
      base: 10,
      limit: 10,
      show: true,
      name: 'custom',
      destination: 'custom-outputs'
    }))
  })

  // tambien se podrian testear el check pero eso otro procedimiento
})