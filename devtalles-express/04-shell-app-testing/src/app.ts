/**
 * process.argv: contiene por defecto un array donde el primer agtumento es el ejecutable de node
 * y el segundo es el archivo que se esta ejecutando
 * [
    'C:\\Users\\Adrian\\Documents\\GitHub\\expressjs-courses\\devtalles-express\\04-miltiplication\\node_modules\\ts-node\\dist\\bin.js',
    'C:\\Users\\Adrian\\Documents\\GitHub\\expressjs-courses\\devtalles-express\\04-miltiplication\\src\\app.ts'
    ]
 * Pero hay maneras de agregar argumentos a la ejecucion de node
 * node dist/app.js --base 5 -l=100 --file=tabla-5.txt -s
 * Obtendríamos:
 * [
    'C:\\Users\\Adrian\\Documents\\GitHub\\expressjs-courses\\devtalles-express\\04-miltiplication\\node_modules\\ts-node\\dist\\bin.js',
    'C:\\Users\\Adrian\\Documents\\GitHub\\expressjs-courses\\devtalles-express\\04-miltiplication\\src\\app.ts',
    '--base',
    '5',
    '-l=100',
    '--file=tabla-5.txt',
    '-s'
  ]
 */

import { args } from "./plugins"
import { ServerApp } from "./presentation/server-app"

(async () => {
  await main()
  console.log("Termino la ejecucion")
})()

async function main() {
  const { b:base, l:limit, s:showTable, d:fileDestination, n:fileName } = args
  ServerApp.run({base, limit, showTable, fileDestination, fileName})
}
