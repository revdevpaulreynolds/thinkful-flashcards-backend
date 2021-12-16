const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./cards.controller");

router.route("/")
    .post(controller.create)
    .all(methodNotAllowed)

router.route("/:cardId")
    .get(controller.get)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)

module.exports = router;