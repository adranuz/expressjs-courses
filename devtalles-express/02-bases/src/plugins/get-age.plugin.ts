const getAgePlugin = require('get-age')

export const getAge = (birthdate: Date ) => {
  if(!birthdate) return new Error('Birthdate is required')
  return getAgePlugin(birthdate)
}

// module.exports = {
//   getAge,
// }