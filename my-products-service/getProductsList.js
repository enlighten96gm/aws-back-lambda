import products from "./mocks/products";

export const getProductsList = async (event, context, callback) => {
  // Suppouse to be BD entity here
  const wholeProductsEntity = await products;
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(wholeProductsEntity),
    isBase64Encoded: false,
  };
  callback(null, response);
};
