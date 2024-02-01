interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string

}
interface CreateTableOptions {
  base: number
  limit: number
}

export class CreateTable implements CreateTableUseCase{
  constructor(
    /** DI - Dependency Injection
     * 1. Dependencias Externas
     * 2. Dependencias Propias
     * 3. Dependencias de Configuración
    */
  ) {}

  // funcion para ejecutar el caso de uso
  execute({base, limit = 10}: CreateTableOptions) {
    let outputMessage = ''
    for (let i = 1; i <= limit; i++) {
      outputMessage += `${base} x ${i} = ${base * i}`
      if (i !== limit) outputMessage += '\n'
    }
    return outputMessage;
  }
}