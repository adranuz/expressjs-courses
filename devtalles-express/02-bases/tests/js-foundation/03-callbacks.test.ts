import { getUserById } from '../../src/js-foundation/03-callbacks';

/*
done funciona como un callback para avisar que la prueba termino

si no lo ponemos la prueba solo hara un scan de todo el contenido
  y al no tener un mensaje de error dara como que se cumplio la prueba
*/
describe('js-foundation/03-callbacks.ts', () => {
  test("getUserById should return an error if user does not exist", (done) => {
		// Arrange:
		const id = 10;
		// Act:
		const user = getUserById(id, (err, user) => {
			// Assert:
			// en este caso, evaluamos desde el callback enviado
			expect(err).toBe(`User with id ${id} not exists`);
			expect(user).toBeUndefined();
			done(); // la prueba va a esperar a que se ejecute el done, sino no termina
		});
	});

	test("getUserById should return an user object", (done) => {
		// Arrange:
		const id = 1;
		const userData = {
			id,
			name: 'Fernando'
		};
		// Act:
		getUserById(id, (err, user) => {
			// Assert:
			// en este caso, evaluamos desde el callback enviado
			expect(err).toBeUndefined();
			expect(user).toEqual(userData);
			done();
		});
	});
})