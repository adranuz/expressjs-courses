import { SafeFile } from './safe-file.use-case';
import fs from 'fs';
describe('SaveFileUseCase', () => {
  afterEach(() => {
    fs.rmSync('outputs', { recursive: true, force: true });
  })
  test('should create a new instance of save file use case', () => {
    // Arrange:
    const savedFile = new SafeFile();
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content',
    }
    // Act:
    const result = savedFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    // Assert:
    expect(savedFile).toBeInstanceOf(SafeFile);
    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe('test content');
  })

  test('should create a new instance of save file use case', () => {
    // Arrange:
    const savedFile = new SafeFile();
    const mainFolder = 'custom-output';
    const options = {
      fileContent: 'test content',
      fileDestination: mainFolder+'/file-destination',
      fileName: 'custom-table-name'
    }
    const filePath = options.fileDestination+'/'+options.fileName+'.txt';
    // Act:
    const result = savedFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    // Assert:
    expect(savedFile).toBeInstanceOf(SafeFile);
    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe('test content');
    fs.rmSync(mainFolder, { recursive: true, force: true });
  })

  test('should return false in create folder error', () => {
    // Arrange:
    const savedFile = new SafeFile();
    const filePath = 'outputs/table.txt';
    // espia el metodo mkdirSync para lanzar un error en la ejecucion
    // mockImplementation, reemplaza el metodo original por lo que querramos
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error('Error creating folder');
    })
    const options = {
      fileContent: 'test content',
    }
    // Act:
    const result = savedFile.execute(options);
    // Assert:
    expect(result).toBe(false);
    // Reset:
    mkdirSpy.mockRestore();
  })
  
  test('should return false in create file error', () => {
    // Arrange:
    const savedFile = new SafeFile();
    const mkdirSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('Error creating file');
    })
    const options = {
      fileContent: 'test content',
    }
    // Act:
    const result = savedFile.execute(options);
    // Assert:
    expect(result).toBe(false);
    // Reset:
    mkdirSpy.mockRestore();
  })
})