import pg from "pg";
const { Client } = pg;

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

export const postProduct = async (event, context, callback) => {
  const client = new Client(dbOptions);
  await client.connect();

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json;charset=UTF-8",
  };
  let response;

  const generateBody = (data) => ({
    description: data.description,
    title: data.title,
    price: data.price,
    count: data.count,
  });

  const resultBody = generateBody(JSON.parse(event.body));

  console.log("Result body", resultBody);

  Object.keys(resultBody).forEach((key) => {
    if (!resultBody[key]) {
      callback(null, {
        statusCode: 400,
        headers: headers,
        body: JSON.stringify({
          message: `Enter field: ${key}`,
        }),
        isBase64Encoded: false,
      });
      client.end();
    }
  });

  try {
    const dmlResult = await client.query(`
    insert into products ( title, description, price) values
    ('${resultBody.title}', '${resultBody.description}', '${resultBody.price}')
    returning id
    `);
    const currId = dmlResult.rows[0].id;

    await client.query(`
        insert into stocks (product_id, count) values
        ('${currId}', '${resultBody.count}')
    `);

    response = {
      statusCode: 201,
      headers: headers,
      body: JSON.stringify(resultBody),
      isBase64Encoded: false,
    };
    callback(null, response);
  } catch (error) {
    console.error(error, "Catch Error");

    response = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        message: `Oops, ${error.message}`,
      }),
      isBase64Encoded: false,
    };
    callback(response, null);
  } finally {
    client.end();
  }
};
