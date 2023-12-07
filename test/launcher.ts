import { handler } from "../src/services/spaces/handler";

// handler(
//   {
//     httpMethod: "POST",
//     body: JSON.stringify({
//       name: "Taj Mahal Palace Hotel",
//       location: "Mumbai",
//     }),
//   } as any,
//   {} as any
// );

// handler(
//   {
//     httpMethod: "GET",
//   } as any,
//   {} as any
// );

handler(
  {
    httpMethod: "GET",
    queryStringParameters: {
      id: "759b0f9d-3980-48e9-9e83-b94f7f6df412",
    },
  } as any,
  {} as any
);
