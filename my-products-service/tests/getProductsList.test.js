import { getProductsList } from "../getProductsList";

const mockedSuccessResponse = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  isBase64Encoded: false,
  body: JSON.stringify([
    {
      productName: "Iron",
      productPrice: 2,
      productCurrency: "$",
      productCount: 100,
      productId: "1",
    },
    {
      productName: "Fur",
      productPrice: 1,
      productCurrency: "$",
      productCount: 20,
      productId: "2",
    },
    {
      productName: "Mythrill",
      productPrice: 1000,
      productCurrency: "$",
      productCount: 2,
      productId: "3",
    },
  ]),
};

describe("getProductsList function tests", () => {
  it("getProductsById's callback called", async () => {
    const fn = jest.fn();
    await getProductsList({}, null, fn);
    expect(fn).toBeCalledTimes(1);
  });

  it("getProductsList's callback called with correct params", async () => {
    const fn = jest.fn();
    await getProductsList({}, null, fn);
    expect(fn).toBeCalledWith(null, mockedSuccessResponse);
  });
});
