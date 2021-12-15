const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./decks.controller");

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

router.route("/:deckId")
    .get(controller.read)
    .put(controller.create)
    .delete(controller.delete)
    .all(methodNotAllowed)

module.exports = router;