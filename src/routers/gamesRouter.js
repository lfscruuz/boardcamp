import { Router } from "express";
import { listGames, postGames } from "../controllers/gamesController.js";

const router = Router();

router.get("/games", listGames);
router.post("/games", postGames);

export default router;