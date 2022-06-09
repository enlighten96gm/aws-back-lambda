import products from "./mocks/products";

export const getProductsById = (event, context, callback) => {
  const id = event.queryStringParameters.productId;
  const check = products.filter((product) => product.productId === id)[0];

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    isBase64Encoded: false,
    body: JSON.stringify(check),
  };

  callback(null, response);
};
