import { connectionDB } from "../database/db.js";
import { insertCustomerSchema } from "../schemas/insertCustomerSchema.js";

export async function listCustomers(req, res) {
    const { cpf } = req.query;

    try {
        if (cpf !== undefined){
            const customers = await connectionDB.query(`SELECT * FROM customers WHERE customers."cpf" LIKE '${cpf}%'`);
            res.send(customers.rows);
        } else {
            const customers = await connectionDB.query('SELECT * FROM customers');
            res.send(customers.rows);
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export async function insertCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const user = {
        name,
        phone,
        cpf,
        birthday
    }

    const validation = insertCustomerSchema.validate(user, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(422).send(erros);
        return;
    }
    try {

        await connectionDB.query(
            `INSERT INTO 
                customers (name, phone, cpf, birthday) 
            VALUES 
                ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday]
        );
    } catch (error) {
        console.log(error)
    }
    return res.sendStatus(201);

}

export async function getCustomerById(req, res) {
    const customer = req.customer;

    try {
        return res.send(customer.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

    req.customer = customer;
}

export async function updateCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;
    const customer = req.customer;
    const user = {
        name,
        phone,
        cpf,
        birthday
    }

    const validation = insertCustomerSchema.validate(user, { abortEarly: false })

    if (validation.error) {
        const erros = validation.error.details.map((detail) => detail.message);
        res.status(422).send(erros);
        return;
    }

    if (customer.rows[0].cpf === cpf){
        return res.sendStatus(409);
    }
    try {
        const newCustomer = await connectionDB.query('UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE customers.id = $5', [name, phone, cpf, birthday, id]);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
}