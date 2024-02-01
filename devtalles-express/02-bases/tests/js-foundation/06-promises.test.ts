import { getPokemonById } from "../../src/js-foundation/06-promises";

describe('js-foundation/06-promises', () => {
  // deberia retornar un pokemon
  it('getPokemonById should return a pokemon', async () => {
    const pokemonId = 1
    const pokemonName = await getPokemonById(pokemonId)
    expect(pokemonName).toBe('bulbasaur')
  })

  // deberia retornar un error si el pokemon no existe
  it('getPokemonById should return an error if the pokemon does not exist', async () => {
    const pokemonId = 1000000
    try {
      const pokemonName = await getPokemonById(pokemonId)
      // esta expresion nunca se ejecuta si da un error arriba
      expect(true).toBeFalsy()
    } catch (error) {
      // evalua el mensaje de error como tipo throw new Error
      expect(() => { throw error }).toThrow(`Pokemon not found with id ${pokemonId}`)
    }
  })
})