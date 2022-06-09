import products from "./mocks/products";

export const getProductsList = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(products),
    isBase64Encoded: false,
  };
  callback(null, response);
};
