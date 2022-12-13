import { Router } from "express";
import { insertRental, listRentals, removeRental, returnRental } from "../controllers/rentalController.js";
import { checkIfRentalIdExists } from "../middlewares/rentalsMiddlewares.js";

const router = Router();

router.post("/rentals", insertRental);
router.get("/rentals", listRentals);
router.post("/rentals/:id/return", checkIfRentalIdExists, returnRental);
router.delete("/rentals/:id", checkIfRentalIdExists, removeRental);

export default router;