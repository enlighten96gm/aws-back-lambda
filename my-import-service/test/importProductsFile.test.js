import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { mockClient } from "aws-sdk-client-mock";
import { importProductsFile } from "../importProductsFile";

const BUCKET = "my-import-service";
const s3Mock = mockClient(S3Client);

describe("importProductsFile function tests", () => {
  beforeEach(() => {
    s3Mock.reset();
    s3Mock.on(GetObjectCommand).resolves({});
  });

  it("return response with 201 status code and correct URL", async () => {
    const response = await importProductsFile(
      {
        queryStringParameters: {
          name: "test.csv",
        },
      },
      {}
    );

    expect(response).toEqual({
      statusCode: 201,
      body: expect.stringContaining(`https://${BUCKET}`),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  });
});
