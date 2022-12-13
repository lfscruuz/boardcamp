
import express from "express";
import categoriesRoutes from "./routers/categoriesRouter.js";
import gamesRoutes from "./routers/gamesRouter.js";
import customerRoutes from "./routers/costumersRouter.js";
import rentalsRoutes from "./routers/rentalsRouter.js"
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRoutes);
app.use(gamesRoutes);
app.use(customerRoutes);
app.use(rentalsRoutes);


const port = 4000 | process.env.PORT;
app.listen (port, () => `listening on port ${port}`);