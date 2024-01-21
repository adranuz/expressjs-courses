// const { emailTemplate } = require('./js-foundation/01-template')
// require('./js-foundation/02-destructuring')
// console.log(emailTemplate)

// 03-callbacks
// const { getUserById } = require('./js-foundation/03-callbacks')
// getUserById(2, (err, user) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(user)
// })

// 05-factory
// const { getUUID } = require('./plugins/uuid.plugin');
// const { getAge } = require('./plugins/get-age.plugin');

// const { buildMakePerson } = require('./js-foundation/05-factory')

// const obj = {
//   name: 'Fernando',
//   birthdate: '1994-02-07',
// }

// const personMaker = buildMakePerson({ getUUID, getAge })
// const person = personMaker(obj)
// console.log(person)

// 06-promises
// const { getPokemonById } = require('./js-foundation/06-promises')
// getPokemonById(1)
//   .then(console.log)
//   .catch(console.log)

// building logger
// const { buildLogger } = require('./plugins')
import { buildLogger } from './plugins'

const logger = buildLogger('app.ts')
logger.log('hola mundo')
logger.error('hola mundo')