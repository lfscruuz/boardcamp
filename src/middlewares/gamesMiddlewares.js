import { connectionDB } from "../database/db.js";

export async function insertGameValidation(req, res, next){
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const idExists = await connectionDB.query('SELECT * FROM categories WHERE id=$1', [categoryId]);
    const nameExists = await connectionDB.query('SELECT "name" FROM games');
    
        if (idExists.rows[0] === undefined){
            return res.sendStatus(400);
        }
        nameExists.rows.forEach((n) =>{
            if (n.name === name){
                return res.status(409);
            }
        })
    if (!name || stockTotal === 0 || pricePerDay === 0 ){
        return res.sendStatus(400);
    }

    next();
}