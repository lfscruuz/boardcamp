import { Router } from "express";
import { listGames, insertGames } from "../controllers/gamesController.js";
import { insertGameValidation } from "../middlewares/gamesMiddlewares.js";

const router = Router();

router.get("/games", listGames);
router.post("/games", insertGameValidation, insertGames);

export default router;