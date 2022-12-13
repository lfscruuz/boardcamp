import dayjs from "dayjs";
import { connectionDB } from "../database/db.js";

export async function listRentals(req, res, next) {
    const { customerId } = req.query;
    const { gameId } = req.query;
    try {
        if (customerId !== undefined) {
            const rental = await connectionDB.query('SELECT rentals.*, customers."id" AS "customerId", customers."name" AS "customerName", customers."phone", customers."cpf", customers."birthday", games."id" AS "gameId", games."name" AS "gameName", games."image", games."stockTotal", games."categoryId", games."pricePerDay" FROM rentals JOIN customers ON rentals."customerId" = customers."id" JOIN games ON rentals."gameId" = games."id" WHERE customers."id" = $1', [customerId]);

            const rentalList = [];

            rental.rows.forEach((r) => {
                rentalList.push({
                    id: r.id,
                    customerId: r.customerId,
                    gameId: r.gameId,
                    rentDate: r.rentDate,
                    daysRented: r.daysRented,
                    returnDate: r.returnDate,
                    originalPrice: r.originalPrice,
                    delayFee: r.delayFee,
                    customer: {
                        id: r.customerId,
                        name: r.customerName
                    },
                    game: {
                        id: r.gameId,
                        name: r.gameName,
                        categoryId: r.categoryId,
                        categoryName: r.categoryName
                    }
                }
                )
            })

            res.send(rentalList);
        } else if (customerId === undefined){
            const rental = await connectionDB.query('SELECT rentals.*, customers."id" AS "customerId", customers."name" AS "customerName", customers."phone", customers."cpf", customers."birthday", games."id" AS "gameId", games."name" AS "gameName", games."image", games."stockTotal", games."categoryId", games."pricePerDay" FROM rentals JOIN customers ON rentals."customerId" = customers."id" JOIN games ON rentals."gameId" = games."id"');

            const rentalList = [];

            rental.rows.forEach((r) => {
                rentalList.push({
                    id: r.id,
                    customerId: r.customerId,
                    gameId: r.gameId,
                    rentDate: r.rentDate,
                    daysRented: r.daysRented,
                    returnDate: r.returnDate,
                    originalPrice: r.originalPrice,
                    delayFee: r.delayFee,
                    customer: {
                        id: r.customerId,
                        name: r.customerName
                    },
                    game: {
                        id: r.gameId,
                        name: r.gameName,
                        categoryId: r.categoryId,
                        categoryName: r.categoryName
                    }
                }
                )
            })

            res.send(rentalList);
        } else if (gameId !== undefined) {
            const rental = await connectionDB.query('SELECT rentals.*, customers."id" AS "customerId", customers."name" AS "customerName", customers."phone", customers."cpf", customers."birthday", games."id" AS "gameId", games."name" AS "gameName", games."image", games."stockTotal", games."categoryId", games."pricePerDay" FROM rentals JOIN customers ON rentals."customerId" = customers."id" JOIN games ON rentals."gameId" = games."id" WHERE games."id" = $1', [customerId]);

            const rentalList = [];

            rental.rows.forEach((r) => {
                rentalList.push({
                    id: r.id,
                    customerId: r.customerId,
                    gameId: r.gameId,
                    rentDate: r.rentDate,
                    daysRented: r.daysRented,
                    returnDate: r.returnDate,
                    originalPrice: r.originalPrice,
                    delayFee: r.delayFee,
                    customer: {
                        id: r.customerId,
                        name: r.customerName
                    },
                    game: {
                        id: r.gameId,
                        name: r.gameName,
                        categoryId: r.categoryId,
                        categoryName: r.categoryName
                    }
                }
                )
            })

            res.send(rentalList);
        } else {
            const rental = await connectionDB.query('SELECT rentals.*, customers."id" AS "customerId", customers."name" AS "customerName", customers."phone", customers."cpf", customers."birthday", games."id" AS "gameId", games."name" AS "gameName", games."image", games."stockTotal", games."categoryId", games."pricePerDay" FROM rentals JOIN customers ON rentals."customerId" = customers."id" JOIN games ON rentals."gameId" = games."id"');

            const rentalList = [];

            rental.rows.forEach((r) => {
                rentalList.push({
                    id: r.id,
                    customerId: r.customerId,
                    gameId: r.gameId,
                    rentDate: r.rentDate,
                    daysRented: r.daysRented,
                    returnDate: r.returnDate,
                    originalPrice: r.originalPrice,
                    delayFee: r.delayFee,
                    customer: {
                        id: r.customerId,
                        name: r.customerName
                    },
                    game: {
                        id: r.gameId,
                        name: r.gameName,
                        categoryId: r.categoryId,
                        categoryName: r.categoryName
                    }
                }
                )
            })

            res.send(rentalList);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function insertRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format("YYYY/MM/DD");
    let pricePerDay, originalPrice = 0;

    if (daysRented <= 0) {
        return res.sendStatus(400);
    }

    try {
        const rentals = await connectionDB.query('SELECT * FROM rentals');
        const totalRentals = rentals.rows.length;
        const gameStock = await connectionDB.query('SELECT "stockTotal" FROM games WHERE id = $1', [gameId]);
        const totalInStock = gameStock.rows[0].stockTotal;

        if (totalRentals >= totalInStock) {
            return res.sendStatus(400);
        }

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    try {
        const gameExists = await connectionDB.query('SELECT * FROM games WHERE id = $1', [gameId]);
        if (gameExists.rows[0] === undefined) {
            return res.sendStatus(400);
        }
    } catch (error) {
        console; log(error);
        return res.sendStatus(500)
    }

    try {
        const customerExists = await connectionDB.query('SELECT * FROM customers WHERE id = $1', [customerId]);
        if (customerExists.rows[0] === undefined) {
            return res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

    try {
        pricePerDay = await connectionDB.query('SELECT "pricePerDay" FROM games WHERE games.id = $1', [gameId]);
        pricePerDay = pricePerDay.rows[0].pricePerDay;
        originalPrice = pricePerDay * daysRented;
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }

    try {

        await connectionDB.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") VALUES ($1, $2, $3, $4, $5)',
            [customerId, gameId, rentDate, daysRented, originalPrice]
        );
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function returnRental(req, res) {
    const { id } = req.params;
    const returnDate = dayjs().format("YYYY/MM/DD");
    try {
        const rental = await connectionDB.query('SELECT * FROM rentals WHERE id = $1', [id]);
        if (rental.rows[0].delayFee !== null || rental.rows[0].returnDate !== null) {
            return res.sendStatus(400)
        }
        const delay = Math.floor(dayjs().diff(returnDate, rental.rows[0].rentDate) / 86400000);
        const delayFee = (delay * rental.rows[0].originalPrice);

        await connectionDB.query('UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3', [returnDate, delayFee, id]);

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function removeRental(req, res) {
    const { id } = req.params;
    try {

        const rental = await connectionDB.query('SELECT "returnDate" FROM rentals WHERE id = $1', [id]);

        if (rental.rows[0].returnDate === null) {
            return res.sendStatus(400);
        }
        await connectionDB.query('DELETE FROM rentals WHERE id = $1', [id]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}