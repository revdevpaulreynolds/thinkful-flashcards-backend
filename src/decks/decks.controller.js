const service = require("./decks.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {

}

async function read(req, res) {

}

async function create(req, res) {

}

async function destroy(req, res) {

}


module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(read)],
    create: [asyncErrorBoundary(create)],
    delete: [asyncErrorBoundary(destroy)],
}

//list, read, create, delete