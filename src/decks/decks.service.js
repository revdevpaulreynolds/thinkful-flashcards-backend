const knex = require("../db/connection");

function list() {
    return knex("decks")
        .select("*");
}

function read(deckId) {
    return knex("decks")
        .select("*")
        .where({"id": deckId})
        .first();
}

function create(newDeck) {
    return knex("decks")
        .insert(newDeck)
        .returning("*")
        .then(res => res[0]);
}

function update(updatedDeck) {
    return knex("decks as d")
        .update(updatedDeck, "*")
        .where({"d.id": updatedDeck.id})
        .then(res => res[0])
}

function destroy(id) {
    return knex("decks")
        .where({id})
        .del();
}

module.exports = {
    list,
    read,
    create,
    update,
    destroy,
}