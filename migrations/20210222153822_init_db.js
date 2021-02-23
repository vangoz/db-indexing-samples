
exports.up = async function(knex) {
  return knex.schema
  .createTable('employees', table => {
    table.increments('employee_id').primary();
    table.string('first_name', 30).notNullable();
    table.string('last_name', 30).notNullable();
    table.string('phone_number', 30).notNullable();
    table.integer('age').unsigned().notNullable();
    table.timestamp('create_time').notNullable();
    table.timestamp('update_time').notNullable();
    table.index(['first_name', 'last_name']);
    table.index(['age','create_time']);
    table.index('update_time');
  })
  .createTable('buyers', table => {
    table.increments('buyer_id').primary();
    table.string('name', 30).notNullable().index();
    table.string('city', 30).notNullable().index();
  })
  .createTable('orders', table => {
    table.increments('order_id').primary();
    table.string('buyer_name', 30).nullable().references('buyers.name');
    table.string('product_name', 50).notNullable().index();
  })
  .then(async () => {
    await knex.raw(`ALTER TABLE buyers ADD COLUMN last_name varchar(30) AS (SUBSTRING_INDEX(name,' ',-1))`);
    await knex.raw('CREATE INDEX buyers_last_name_index ON buyers(last_name)');
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('orders')
  .dropTable('buyers')
  .dropTable('employees')
};
