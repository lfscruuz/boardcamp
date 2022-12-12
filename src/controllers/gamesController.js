import { connection } from "../server.js";

export async function listGames(req, res) {
    const games = await connection.query('SELECT games."name", games."image", games."stockTotal", games."categoryId", games."pricePerDay", categories."name" AS categoryName FROM games JOIN categories ON games."categoryId" = categories.id');
    res.send(games.rows);
}

export async function postGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await connection.query(
            'INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
            [name, image, stockTotal, categoryId, pricePerDay]
        );
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500)
    }

}