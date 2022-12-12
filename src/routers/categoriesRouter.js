import { Router } from "express";
import { insertCategory, listCategories } from "../controllers/categoriesController.js";

const router = Router();

router.get("/categories", listCategories);
router.post("/categories", insertCategory);
export default router