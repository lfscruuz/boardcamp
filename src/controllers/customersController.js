import { connectionDB } from "../database/db.js";

export async function listCustomers(req, res){
    try {
        const customers = await connectionDB.query('SELECT * FROM customers');
        res.send(customers.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function insertCustomer(req, res){
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

export async function getCustomerById(req, res){
    const { id } = req.params;

    try {
        const customer = await connectionDB.query('SELECT * FROM customers WHERE customers.id = $1', [id])
        if (customer.rows[0] === undefined){
            return res.sendStatus(404);
        }
        return res.send(customer.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

    req.customer = customer;
}

export async function updateCustomer(req, res){
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;
    const customer = await connectionDB.query('UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE customers.id = $5', [name, phone, cpf, birthday, id]);
    console.log(customer.rows);
    res.send(customer.rows);
}