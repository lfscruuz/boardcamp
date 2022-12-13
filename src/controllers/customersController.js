import { connectionDB } from "../database/db.js";

export async function listCustomers(req, res) {
    try {
        const customers = await connectionDB.query('SELECT * FROM customers');
        res.send(customers.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function insertCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

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