import pkg from "pg";

const { Pool } = pkg;
export const connectionDB = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "395112",
  database: "boardcamp",
});