
interface User {
  id : number;
  name : string;
}
const users: User[] = [
  {
    id: 1,
    name: 'Fernando'
  },
  {
    id: 2,
    name: 'Linda'
  },
]


// Function es un tipado demaciado general para las funciones
// es mas aceptable usar el tipado de las funciones con argumentos y retorno
type CallBack = (err?: string, user?: User) => void
export const getUserById = (id: number, callback: CallBack) => {
  const user = users.find(user => user.id === id);

  if (!user) {
    return callback(`User with id ${id} not exists`, undefined);
  }
  return callback(undefined, user);
}

// module.exports = {
  // getUserById
// }
