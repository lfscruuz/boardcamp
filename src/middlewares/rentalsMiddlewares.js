import { connectionDB } from "../database/db.js";

export async function checkIfRentalIdExists(req, res, next){
    const { id } = req.params;

    try {
        const idExists = await connectionDB.query('SELECT "id" FROM rentals WHERE id = $1', [id]);
        if (idExists.rows[0] === undefined){
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    
    next();
}