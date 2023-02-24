exports.up = async function (sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS action (
      id SERIAL PRIMARY KEY NOT NULL,
      name CHARACTER VARYING(255) NOT NULL
    );
  `;
};


exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS action;
  `
}

