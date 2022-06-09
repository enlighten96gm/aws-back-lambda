import { getProductsById } from "../getProductsById";

const mockCorrectID = {
  pathParameters: {
    productId: "1",
  },
};

const mockIncorrectID = {
  pathParameters: {
    productId: "999999",
  },
};

const mockedSuccessResponse = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/javascript;charset=UTF-8",
  },
  isBase64Encoded: false,
  body: JSON.stringify({
    productName: "Iron",
    productPrice: 2,
    productCurrency: "$",
    productCount: 100,
    productId: "1",
  }),
};

const mockedFailureResponse = {
  statusCode: 404,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/javascript;charset=UTF-8",
  },
  isBase64Encoded: false,
  body: JSON.stringify({ message: "Product not found" }),
};

describe("getProductsById function tests", () => {
  it("getProductsById's callback called", async () => {
    const fn = jest.fn();
    await getProductsById(mockCorrectID, null, fn);
    expect(fn).toBeCalledTimes(1);
  });

  it("getProductsById's callback called with correct params", async () => {
    const fn = jest.fn();
    await getProductsById(mockCorrectID, null, fn);
    expect(fn).toBeCalledWith(null, mockedSuccessResponse);
  });

  it("getProductsById's callback called with incorrect params", async () => {
    const fn = jest.fn();
    await getProductsById(mockIncorrectID, null, fn);
    expect(fn).toBeCalledWith(null, mockedFailureResponse);
  });
});
