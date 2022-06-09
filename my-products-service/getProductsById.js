import products from "./mocks/products";

export const getProductsById = async (event, context, callback) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  };
  let response;

  try {
    const id = event.pathParameters.productId;
    // Suppouse to be BD entity here
    let filteredProduct = await products.filter(
      (product) => product.productId === id
    )[0];

    if (filteredProduct) {
      response = {
        statusCode: 200,
        headers: headers,
        isBase64Encoded: false,
        body: JSON.stringify(filteredProduct),
      };
    } else {
      response = {
        statusCode: 404,
        headers: headers,
        isBase64Encoded: false,
        body: JSON.stringify({ message: "Product not found" }),
      };
    }
    callback(null, response);
  } catch (error) {
    response = {
      statusCode: 500,
      headers: headers,
      isBase64Encoded: false,
      body: JSON.stringify({ message: error.message }),
    };
    callback(error, response);
  }
};
