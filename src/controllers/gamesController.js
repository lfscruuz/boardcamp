import { connectionDB } from "../database/db.js";

export async function listGames(req, res) {
    const { name } = req.query;

    if (name !== undefined) {
        const games = await connectionDB.query(`SELECT games."id", games."name", games."image", games."stockTotal", games."categoryId", games."pricePerDay", categories."name" AS categoryName FROM games JOIN categories ON games."categoryId" = categories.id WHERE games."name" LIKE '${name}%'`);
        res.send(games.rows);
    } else {
        const games = await connectionDB.query('SELECT games."id", games."name", games."image", games."stockTotal", games."categoryId", games."pricePerDay", categories."name" AS categoryName FROM games JOIN categories ON games."categoryId" = categories.id');
        res.send(games.rows);
    }
}

export async function insertGames(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        const newGame = await connectionDB.query(
            'INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
            [name, image, stockTotal, categoryId, pricePerDay]
        );
        console.log(newGame)
        return res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500)
    }

}