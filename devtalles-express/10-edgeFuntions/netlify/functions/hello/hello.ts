import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality

  console.log('Hello World')
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World!!" }),
    headers: {
      "Content-Type": "application/json",
    },
  }
};

export { handler };