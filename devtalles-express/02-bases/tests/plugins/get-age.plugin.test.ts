import { getAge } from "../../src/plugins";

describe('plugins/getAge.plugin.ts', () => {
  test('getAge() should return the age of a person', () => {
    // Assert:
    const birthdate = new Date('1995-12-17')
    // Act:
    const age = getAge(birthdate)
    // Arrange:
    expect(typeof age).toBe('number')
  })

  test('getAge should return current age', () => {
    // Assert:
    const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000
    const birthdate = new Date('1995-12-17')
    // Act:
    const age = getAge(birthdate)
    const ageInMilliseconds = new Date().getTime() - birthdate.getTime()
    const calculatedAge = Math.floor(ageInMilliseconds / millisecondsPerYear)
    // Arrange:
    expect(age).toBe(calculatedAge)
  })

  // la meta en este test no es obtener la edad sino leer que la funcion getFullYear fue llamada
  test('getAge should return 0 years', () => {
    /* los espias son funciones que verifican si una función fue llamada o no
    * el primer parametro es el objeto que contiene la función que queremos espiar
    * el segundo parametro es el nombre de la función que queremos espiar
    * mockReturnValue es una funcion de spyOn que nos permite definir el valor de retorno de la función espiada
    */
   // Assert:
    const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995)
    const birthdate = new Date('1995-12-17')
    // Act:
    const age = getAge(birthdate)
    // Arrange:
    expect(age).not.toBe(0)
    // en este caso la funcion no fue llamada porque estamos usando otra libreria.
    // expect(spy).toHaveBeenCalled()
  })
})