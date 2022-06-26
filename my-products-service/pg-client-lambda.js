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

export const invoke = async () => {
  const client = new Client(dbOptions);
  await client.connect();
  try {
    const ddlResult1 = await client.query(`
      create table if not exists products (
        id uuid primary key default uuid_generate_v4(),
        title text, 
        description text,
        price integer
      )`);
    const ddlResult2 = await client.query(`
      create table if not exists stocks (
          product_id uuid,
          count integer,
          foreign key ("product_id") references "products" ("id")
      )`);

    const dmlResult = await client.query(`
        insert into products ( title, description, price) values
            ('Iron', 'Standard Dwarf Iron', '24'),
            ('Fur', 'Standard Deer Fur', '12'),
            ('Mythrill', 'Mythick Dwarf Mythrill', '255'),
            ('Gold', 'Standard Gold', '55'),
            ('True silver', 'Rare True Silver', '96'),
            ('Wood', 'Standart Wood', '5'),
            ('Holy water', 'Holy water', '35')
            returning id
    `);
    const currId = dmlResult.rows;
    console.log(currId);

    const dmlResult2 = await client.query(`
        insert into stocks (product_id, count) values
        ('${currId[0].id}', '100'),
        ('${currId[1].id}', '200'),
        ('${currId[2].id}', '10'),
        ('${currId[3].id}', '50'),
        ('${currId[4].id}', '20'),
        ('${currId[5].id}', '1000'),
        ('${currId[6].id}', '2')
    `);

    const { rows: products } = await client.query(`select * from products`);

    console.log(products);
  } catch (err) {
    console.error("Error during database request executing", err);
  } finally {
    client.end();
  }
};

// const dmlResult = await client.query(`
//         insert into todo_list (list_name, list_description) values
//             ('Sobaka', 'Milyj Pes'),
//             ('NosSobaki', 'Milyj Nos')
//     `);
// const dmlResult2 = await client.query(`
//         insert into todo_item (list_id, item_name, item_description) values
//             ('1', 'Learn Nosik', 'Learn how to work with Nosik'),
//             ('1', 'Learn Pesik', 'Learn how to work with Pesik'),
//             ('2', 'Learn Nososik', 'Learn how to work with Nososik')
//     `);

// products.forEach((item) => {
//     const dmlResult2 = await client.query(`
//     insert into stocks (product_id, count) values
//         ('${item.id}', '200'),
//         ('${item.id}', '100')
// `);
// })
