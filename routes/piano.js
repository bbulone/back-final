var express = require("express");
var router = express.Router();

// Controller

var piano_controller = require("../controller/pianocontroller");

router.get("/", piano_controller.getAll);
router.get("/:id", piano_controller.getById);

router.post("/", piano_controller.create);
router.put("/:id", piano_controller.update);
router.delete("/:id", piano_controller.delete);

module.exports = router;
