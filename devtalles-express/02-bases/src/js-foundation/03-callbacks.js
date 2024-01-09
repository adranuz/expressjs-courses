const users = [
  {
    id: 1,
    name: 'Fernando'
  },
  {
    id: 2,
    name: 'Linda'
  },
]

const getUserById = (id, callback) => {
  const user = users.find(user => user.id === id);

  if (!user) {
    return callback(`User with id ${id} not exists`, null);
  }
  return callback(null, user);
}

module.exports = {
  getUserById
}