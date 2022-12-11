import pkg from "pg";
import express from "express";


const { pool } = pkg;
const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
const app = express();
const port = 4000 | process.env.PORT;


app.listen (port, () => `listening on port ${port}`);