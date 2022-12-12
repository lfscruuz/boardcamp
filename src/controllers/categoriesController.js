import { connection } from "../server.js";

export async function listCategories(req, res){
    try {
        const categories = await connection.query("SELECT * FROM categories");

        res.send(categories.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function insertCategory(req, res){
    const { name } = req.body;

    try {
        const newCategory = await connection.query("INSERT INTO categories (name) VALUES ($1)", [name]);
        console.log(newCategory);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}