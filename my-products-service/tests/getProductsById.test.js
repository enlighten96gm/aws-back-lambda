import { getProductsById } from "../getProductsById";

const mockCorrectID = {
  pathParameters: {
    id: "1",
  },
};

const mockIncorrectID = {
  pathParameters: {
    id: "999999",
  },
};

const mockedSuccessResponse = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  },
  isBase64Encoded: false,
  body: JSON.stringify({
    count: 100,
    description: "Iron",
    id: "1",
    price: 2.4,
    title: "Standard Dwarf Iron",
    image:
      "https://media.istockphoto.com/photos/zinc-mine-nugget-picture-id172430480?k=20&m=172430480&s=612x612&w=0&h=eH83SmYBBKdtH8FyZ-9882xmtCIInXqK5Y4B-XwdNwY=",
  }),
};

const mockedFailureResponse = {
  statusCode: 404,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
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
