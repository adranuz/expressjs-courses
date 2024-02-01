import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SafeFile } from '../domain/use-cases/safe-file.use-case';
import { ServerApp } from './server-app';
describe('server-app', () => {
  // este test solo verifica que sea una clase y que exista la funcion en run
  test('should create ServerApp instance', () => {
    // Arrange:
    const serverApp = new ServerApp();
    // Act:
    // Assert:
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe('function');
  });

  // ahora quiero testear que los metodos que estoy usando me retornen lo esperado para poder seguir funcionando
  test('should run ServerApp with options', () => {
    // spys
    const logSpy = jest.spyOn(console, 'log')
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
    const saveFileSpy = jest.spyOn(SafeFile.prototype, 'execute')
    // Arrange:
    const options = {
      base: 2,
      limit: 10,
      showTable: true,
      fileDestination: 'test-destination',
      fileName: 'test-filename'
    }
    // Act:
    const serverApp = ServerApp.run(options);
    // Assert:
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith('Server running');
    expect(logSpy).toHaveBeenLastCalledWith('File created');

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base, limit: options.limit
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName
    });

  });

});