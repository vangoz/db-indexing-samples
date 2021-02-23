This is a sample database used for showcasing Database Indexing performance.

To generate the database:
1. Install NPM (https://www.npmjs.com/get-npm)
2. Run `npm install`
3. Copy knexfile.example.js to knexfile.js, update with your DB credential
4. Run `knex migrate:latest`
5. Populate the table data with `knex seed:run` (can take some time)