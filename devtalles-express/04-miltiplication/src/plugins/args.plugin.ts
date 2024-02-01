import yargsLib from "yargs";
import { hideBin } from "yargs/helpers";
/**
 * Aqui se definen todos los argumentos que se pueden pasar a la ejecucion de node
 *
 * Para obtener el listado de argumentos necesarios ejectuar:
 *  $ npm run build
 *  $ node dist/app.js --help
 *
 * Para ejecutar el programa:
 *  $ node src/app.js -b 10 -l 10 -s
 *
 * O, para usar el entorno de desarrollo:
 *  $ npx ts-node src/app.ts -b 10 -l 10 -s
 *  $ npx ts-node src/app.ts --help
 */
export const args = yargsLib(hideBin(process.argv))
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Base of multiplication table'
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Limit the multiplication table'
  })
  .option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show multiplication table'
  })
  .option('n', {
    alias: 'name',
    type: 'string',
    default: 'table',
    describe: 'Name of the file'
  })
  .option('d', {
    alias: 'destination',
    describe: 'File destination',
    type: 'string',
    default: './outputs'
  })
  .check((argv) => {
    if(argv.b < 1 || argv.b > 20) throw "Error: Base must be between 1 and 20"
    return true
  })
  .parseSync()
