import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality
  // netlify puede acceder a las variables de entorno, por lo que no requiere dotenv
  const myImportantVariable = process.env.MY_IMPORTANT_VARIABLE;

  if(!myImportantVariable) {
    throw new Error("No se encontró la variable de entorno MY_IMPORTANT_VARIABLE");
    // throw "No se encontró la variable de entorno MY_IMPORTANT_VARIABLE";
  }

  console.log('Hello Variables')

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World!!",
      variable: myImportantVariable
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }
};

export { handler };