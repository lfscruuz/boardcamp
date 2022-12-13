import { connectionDB } from "../database/db.js";

export async function insertCustomerValidation(req, res, next){
    const {cpf} = req.body;

    try {
        const cpfExists = await connectionDB.query('SELECT cpf FROM customers');
        cpfExists.rows.forEach((e) => {
            if (e.cpf === cpf){
                return res.sendStatus(409);
            }
        });
    } catch (error) {
        console.log(error);
    }

    next();
}