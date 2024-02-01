import { httpClientPlugin } from "../plugins"
// const { httpClientPlugin } = require('../plugins/http-client.plugin')

export const getPokemonById = async (id: string|number):Promise<string> => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await httpClientPlugin.get(url)
    return pokemon.name
  } catch (error) {
    throw new Error(`Pokemon not found with id ${id}`)
  }
  
  // fetch(url).then((res) => res.json())
  //   .then((data) => {
  //     callback(data.name)
  //   })
  //   .catch((err) => {})
  // const res = await fetch(url)
  // const data = await res.json()
  // throw new Error('Error en la peticion')
  
}
