import { connectionDB } from "../database/db.js";

export async function listCategories(req, res){
    try {
        const categories = await connectionDB.query("SELECT * FROM categories");

        res.send(categories.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function insertCategory(req, res){
    const { name } = req.body;

    try {
        const newCategory = await connectionDB.query("INSERT INTO categories (name) VALUES ($1)", [name]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}