const service = require("./cards.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function cardExists(req, res, next) {
    const { cardId } = req.params;
    const card = await service.get(cardId);
    if (card) {
        res.locals.card = card;
        return next();
    }
    return next({ status: 404, message: "Invalid card" });
}

async function readCard(req, res) {
    res.json({ data: res.locals.card });
}

async function post(req, res) {

}

async function create(req, res) {

}

async function destroy(req, res) {

}

module.exports = {
    get: [asyncErrorBoundary(cardExists), readCard],
    post,
    create,
    delete: [destroy],
}

// post, get, create, delete