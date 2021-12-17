const service = require("./cards.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function cardExists(req, res, next) {
    const { cardId } = req.params;
    const card = await service.read(cardId);
    if (card) {
        res.locals.card = card;
        return next();
    }
    return next({ status: 404, message: "Invalid card" });
}



async function readCard(req, res) {
    res.json(res.locals.card);
}

async function update(req, res) {
    const updatedCard = {
        ...req.body,
        id: res.locals.card.id,
    }
    res.json(await service.update(updatedCard));
}

async function create(req, res) {
    const newCard = await service.create(req.body);
    res.status(201).json(newCard)
}

async function destroy(req, res) {
    const {cardId} = req.params;
    await service.destroy(cardId);
    res.sendStatus(204);
}

module.exports = {
    get: [asyncErrorBoundary(cardExists), readCard],
    update: [asyncErrorBoundary(cardExists), asyncErrorBoundary(update)],
    create: asyncErrorBoundary(create),
    delete: [asyncErrorBoundary(cardExists), asyncErrorBoundary(destroy)],
}

// post, get, create, delete