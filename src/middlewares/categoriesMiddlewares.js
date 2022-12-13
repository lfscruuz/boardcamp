import { connectionDB } from "../database/db.js";


export async function insertCategoryValidation(req, res, next){
    const { name } = req.body;
    
    if (!name){
        return res.sendStatus(400);
    }
    
    try {
        const nameExists = await connectionDB.query("SELECT name FROM categories");
        nameExists.rows.forEach((n) =>{
            if (n.name === name){
                return res.sendStatus(409);
            }
        })
    } catch (error) {
        res.sendStatus(500)
    }

    next();
}