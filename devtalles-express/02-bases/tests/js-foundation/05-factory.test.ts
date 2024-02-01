import { buildMakePerson } from "../../src/js-foundation/05-factory"

describe('js-foundation/05-factory.ts', () => {
  const getUUID = () => '12345'
  const getAge = () => 12

  // espero que lo que retorna sea una funcion
  it('buildMakePerson should return a function', () => {
    const personBuilder = buildMakePerson({ getUUID, getAge })
    expect(typeof personBuilder).toBe('function')
  })

  // espero que la funcion retorne un objeto
  it('personBuilder should return an object', () => {
    const personBuilder = buildMakePerson({ getUUID, getAge })
    const person = personBuilder({ name: 'John', birthdate: '2000-01-01' })
    expect(person).toEqual({
      id: '12345',
      name: 'John',
      birthdate: '2000-01-01',
      age: 12,
    })
  })
})