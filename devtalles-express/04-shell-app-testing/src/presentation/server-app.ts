// orquestador de la funcion de la aplicacion

import { CreateTable } from "../domain/use-cases/create-table.use-case"
import { SafeFile } from "../domain/use-cases/safe-file.use-case"

interface RunOptions {
  base: number
  limit: number
  showTable: boolean
  fileDestination?: string
  fileName?: string
}
export class ServerApp {
  constructor() {}


  // los metodos estaticos declaran que no necesitan una instancia de la clase para ser ejecutados
  static run({ base, limit, showTable, fileDestination, fileName }: RunOptions) {
    console.log('Server running')
    const fileContent = new CreateTable()
      .execute({base, limit})
    const wasCreated = new SafeFile()
      .execute({fileContent, fileName: fileName ??`table-${base}`, fileDestination})

    if (showTable) { console.log(fileContent) }

    (wasCreated)
      ? console.log(`File created`)
      : console.log('File not created')
  }
}