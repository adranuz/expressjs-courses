import fs from "fs";
import { args } from "./plugins";

const { base, limit, show } = args
let outputMessage = ''
const headerMessage = `
=============================
      Tabla del ${base}
=============================
`
const l = limit as number
for (let i = 1; i <= l; i++) {
  outputMessage += `${base} x ${i} = ${base as number * i}\n`
}

console.log(args)

outputMessage = headerMessage + outputMessage
if (show) console.log(outputMessage)

fs.writeFileSync(`outputs/tabla-${base}.txt`, outputMessage)
console.log(`Archivo tabla-${base}.txt creado`)