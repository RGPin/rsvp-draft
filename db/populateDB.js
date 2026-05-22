const { Client } = require("pg");

const SQL = `
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS invites (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  guest_name TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  responded BOOLEAN NOT NULL DEFAULT FALSE,
  attending BOOLEAN
);

INSERT INTO invites (guest_name)
VALUES
  ('Christian'),
  ('Ryan'),
  ('Molina');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `${process.env.DB_URI}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
