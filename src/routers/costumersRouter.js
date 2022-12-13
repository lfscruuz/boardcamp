import { Router } from "express";
import { getCustomerById, insertCustomer, listCustomers, updateCustomer } from "../controllers/customersController.js";
import { insertCustomerValidation } from "../middlewares/customersMiddlewares.js";

const router = Router();

router.get("/customers", listCustomers);
router.get("/customers/:id", getCustomerById);
router.post("/customers", insertCustomerValidation, insertCustomer);
router.put("/customers/:id", updateCustomer)
export default router;