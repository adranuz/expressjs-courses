import fs from 'fs';
interface SafeFileUseCase {
  execute: (options: SafeFileOptions) => boolean

}
interface SafeFileOptions {
  fileContent: string
  fileDestination?: string
  fileName?: string
}

export class SafeFile implements SafeFileUseCase{
  constructor(
    /** DI - Dependency Injection
     * aqui deberia estar el storage donde se guarda la data
    */
  ) {}

  // funcion para ejecutar el caso de uso
  execute({
    fileContent,
    fileDestination = 'outputs',
    fileName = 'table'
  }: SafeFileOptions) {
    try {
    // set path
    fs.mkdirSync(fileDestination, { recursive: true })

    // run create
    fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent)
    // console.log(`Archivo ${fileName}.txt creado`)
    return true
  } catch (error) {
    console.error('Error al crear el archivo', error)
    return false
  }
  }
}