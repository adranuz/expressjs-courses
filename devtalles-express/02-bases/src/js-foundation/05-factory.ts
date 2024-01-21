// esta es una factory function, una funcion que retorna otra funcion
// se usa para poder mandar mis dependencias como argumentos.
// de esta manera definimos getUUID y getAge solo una vez

interface BuildMakePersonProps {
  getUUID: () => string;
  getAge: (birthdate: string) => number;
}

interface CallbackOptions {
  name: string;
  birthdate: string;
}

export const buildMakePerson = ({getUUID, getAge}: BuildMakePersonProps) => {
  return ({name, birthdate}: CallbackOptions) => {
    return {
      id: getUUID(),
      name,
      birthdate,
      age: getAge(birthdate),
    }
  }
}

// module.exports = {
//   buildMakePerson
// }