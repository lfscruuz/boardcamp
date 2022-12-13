import { Router } from "express";
import { getCustomerById, insertCustomer, listCustomers, updateCustomer } from "../controllers/customersController.js";
import { checkIfUserExists, cpfValidation } from "../middlewares/customersMiddlewares.js";

const router = Router();

router.get("/customers", listCustomers);
router.get("/customers/:id", checkIfUserExists, getCustomerById);
router.put("/customers/:id", checkIfUserExists, updateCustomer);
router.post("/customers", cpfValidation, insertCustomer);
export default router;