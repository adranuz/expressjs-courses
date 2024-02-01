const getAgePlugin = require('get-age')

export const getAge = (birthdate: Date ) => {
  return getAgePlugin(birthdate)
}
