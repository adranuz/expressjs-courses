const { httpClientPlugin } = require('../plugins/http-client.plugin')
const getPokemonById = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  
  // fetch(url).then((res) => res.json())
  //   .then((data) => {
  //     callback(data.name)
  //   })
  //   .catch((err) => {})
  // const res = await fetch(url)
  // const data = await res.json()
  // throw new Error('Error en la peticion')
  
  const pokemon = await httpClientPlugin.get(url)
  return pokemon.name
}

module.exports = {
  getPokemonById
}
