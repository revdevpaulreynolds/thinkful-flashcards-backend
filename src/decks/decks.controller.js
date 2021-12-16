const service = require("./decks.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function deckExists(req, res, next) {
    const { deckId } = req.params;
    const deck = await service.read(deckId);
    if(deck) {
        res.locals.deck = deck;
        return next();
    }
    return next({ status: 404, message: "Deck not found"})
}

async function list(req, res) {
    res.json({data: await service.list()})
}

async function read(req, res) {
    res.json({data: res.locals.deck});
}

async function create(req, res) {
    const newDeck = await service.create(req.body.data);
    res.status(201).json({
        data: newDeck,
    });
}

async function update(req, res) {
    const updatedDeck = {
        ...req.body.data,
        id: res.locals.deck.id,
    }
    const data = await service.update(updatedDeck);
    res.json({ data })
}

async function destroy(req, res) {
    const {deckId} = req.params;
    await service.destroy(deckId);
    res.sendStatus(204);
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(deckExists), read],
    create: [asyncErrorBoundary(create)],
    update: [asyncErrorBoundary(deckExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(deckExists), asyncErrorBoundary(destroy)],
}