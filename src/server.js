import pkg from "pg";
import express from "express";
import categoriesRoutes from "./routers/categoriesRouter.js";
import gamesRoutes from "./routers/gamesRouter.js"
import cors from "cors";

const { Pool } = pkg;
export const connection = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "395112",
  database: "boardcamp",
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(categoriesRoutes);
app.use(gamesRoutes);


const port = 4000 | process.env.PORT;
app.listen (port, () => `listening on port ${port}`);