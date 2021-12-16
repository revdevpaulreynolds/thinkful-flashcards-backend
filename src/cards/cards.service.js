const knex = require("../db/connection");

function listCardsByDeckId(deckId) {
    return knex("cards")
        .select("*")
        .where({deckId})
}

function destroy(id) {
    return knex("cards")
        .where({id})
        .del();
}

function create(card) {
    return knex("cards")
        .insert(card)
        .returning("*")
        .then(res => res[0])
}

function read(id) {
    return knex("cards")
        .select("*")
        .where({id})
        .first()
}

function update(card) {
    return knex("cards as c")
        .update(card, "*")
        .where({"c.id": card.id})
}

module.exports = {
    listCardsByDeckId,
    destroy,
    create,
    read,
    update,
}