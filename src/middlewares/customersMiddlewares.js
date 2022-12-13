import { connectionDB } from "../database/db.js";

export async function cpfValidation(req, res, next) {
    const { cpf } = req.body;

    try {
        const cpfExists = await connectionDB.query('SELECT cpf FROM customers');
        cpfExists.rows.forEach((e) => {
            if (e.cpf === cpf) {
                return res.sendStatus(409);
            }
        });
    } catch (error) {
        console.log(error);
    }

    next();
}

export async function checkIfUserExists(req, res, next) {
    const { id } = req.params;

    const customer = await connectionDB.query('SELECT * FROM customers WHERE customers.id = $1', [id])
    console.log(customer)
    if (customer.rows[0] === undefined) {
        return res.sendStatus(404);
    }

    req.customer = customer;
    next();
}