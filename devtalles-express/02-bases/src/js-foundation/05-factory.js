// esta es una factory function, una funcion que retorna otra funcion
// se usa para poder mandar mis dependencias como argumentos.
// de esta manera definimos getUUID y getAge solo una vez
const buildMakePerson = ({ getUUID, getAge}) => {
  return ({name, birthdate}) => {
    return {
      id: getUUID(),
      name,
      birthdate,
      age: getAge(birthdate),
    }
  }
}

module.exports = {
  buildMakePerson
}