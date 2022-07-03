import AWS from "aws-sdk";
const BUCKET = "my-import-service";
import csv from "csv-parser";

export const importFileParser = async (event) => {
  const s3 = new AWS.S3({ region: "eu-west-1" });
  for (const record of event.Records) {
    const key = record.s3.object.key;
    const bucketName = record.s3.bucket.name;

    const bucket = s3.getObject({
      Bucket: BUCKET,
      Key: key,
    });

    const handleParseAndUpdate = async () => {
      console.log(key + " Parsed");
      await s3
        .copyObject({
          Bucket: bucketName,
          Key: key.replace("uploaded", "parsed"),
          CopySource: bucketName + "/" + key,
        })
        .promise();
      await s3
        .deleteObject({
          Bucket: bucketName,
          Key: key,
        })
        .promise();
      console.log(key + " mooved from uploaded to parsed");
    };

    const sobachijNos = () =>
      new Promise(() => {
        bucket
          .createReadStream()
          .pipe(csv())
          .on("data", (item) => {
            console.log(item);
          })
          .on("end", handleParseAndUpdate);
      });

    await sobachijNos();
  }
  return {
    statusCode: 201,
    body: JSON.stringify({ message: "Very good parsed very good mooved" }),
  };
};
