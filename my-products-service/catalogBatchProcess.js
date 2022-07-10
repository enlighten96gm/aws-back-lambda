import AWS from "aws-sdk";

export const catalogBatchProcess = (event, context, callback) => {
  const lambda = new AWS.Lambda({ region: "eu-west-1" });
  const sns = new AWS.SNS({ region: "eu-west-1" });

  event.Records.forEach((item) => {
    lambda.invoke(
      {
        FunctionName: "my-products-service-dev-postProduct",
        Payload: JSON.stringify(item),
      },
      async (error, data) => {
        if (error) {
          context.done("lambda.invoke error", error);
        }
        if (data.Payload) {
          await sns
            .publish({
              Subject: "Product published",
              Message: JSON.stringify(item.body),
              TopicArn: process.env.SNS_ARN,
              MessageAttributes: {
                image: {
                  DataType: "String",
                  StringValue: JSON.parse(item.body).image ? "true" : "false",
                },
              },
            })
            .promise()
            .then(() => {
              console.log("Send email for: ", +JSON.stringify(item.body));
            });
          context.succeed(data.Payload);
        }
      }
    );
  });
};
