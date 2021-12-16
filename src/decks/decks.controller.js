const service = require("./decks.service");
const cardsService = require("../cards/cards.service");
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

async function assembleDeck(deck) {
    const cards = await cardsService.listCardsByDeckId(deck.id);
    deck = {
        ...deck,
        cards,
    };
    return deck;
}

async function list(req, res) {
    const decks = await service.list();
    let newDecks = [];
    if (req.query._embed == 'cards') {
        for(deck of decks) {
            deck = await assembleDeck(deck);
            newDecks.push(deck);
        }
    } else {
        newDecks = decks;
    }
    res.json(newDecks)
}

async function read(req, res) {
    const deck = await assembleDeck(res.locals.deck);
    res.json(deck);
}

async function create(req, res) {
    const newDeck = await service.create(req.body);
    res.status(201).json(newDeck);
}

async function update(req, res) {
    const updatedDeck = {
        ...req.body,
        id: res.locals.deck.id,
    }
    const data = await service.update(updatedDeck);
    res.json( data )
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