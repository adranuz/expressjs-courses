
//* prueba que se cree un custom error a partir de un error, y solo eso
export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
  }
  
}