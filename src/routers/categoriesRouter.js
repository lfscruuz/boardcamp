import { Router } from "express";
import { insertCategory, listCategories } from "../controllers/categoriesController.js";
import { insertCategoryValidation } from "../middlewares/categoriesMiddlewares.js";

const router = Router();

router.get("/categories", listCategories);
router.post("/categories", insertCategoryValidation, insertCategory);

export default router;