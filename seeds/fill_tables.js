const faker = require('faker');
const _ = require('lodash');

const SEED_SIZE = 1000000;

exports.seed = async function(knex) {
  const TABLE_NAMES = [
    'employees',
    'buyers',
    'orders'
  ];

  for (const table of TABLE_NAMES){
    await knex(table).del();
    await insertFakeRows(knex, table, SEED_SIZE);
  }
};

const CHUNK_SIZE = 1000;

function* chunkIterator(count){
  for (let i=0; i<count; i += CHUNK_SIZE){
    yield i;
  }
}

const insertFakeRows = async (knex, table, count) => {
  console.log(`Seeding table "${table}"`)
  for (const i of chunkIterator(count)){
    const size = Math.min(i+CHUNK_SIZE, count);
    const rows = _.map(_.range(i, size), createFake[table]);
    await knex(table).insert(rows);
  }
  console.log(`Table "${table}" seeded`)
}

const createFake = {
  'employees': i => ({
    employee_id: i+1,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    phone_number: faker.phone.phoneNumber(),
    age: _.random(17, 65),
    create_time: faker.date.past(),
    update_time: faker.date.past(),
  }),
  'buyers': i => ({
    buyer_id: i+1,
    name: fakeAndStoreName(),
    city: faker.address.city(),
  }),
  'orders': i => ({
    order_id: i+1,
    buyer_name: getRandomStoredName(),
    product_name: faker.commerce.productName(),
  }),
}

const MAP_NAMES = {};
const fakeAndStoreName = () => {
  const name = faker.name.findName();
  MAP_NAMES[name] = 1;
  return name;
}

let MAP_NAMES_KEYS;
const getRandomStoredName = () => {
  if (!MAP_NAMES_KEYS)
    MAP_NAMES_KEYS = Object.keys(MAP_NAMES);
  return MAP_NAMES_KEYS[_.random(0, MAP_NAMES_KEYS.length-1)];
}