const express = require("express");
const router = express.Router();
const ProfileController = require("../../controllers/ProfileController");

router.post("/", ProfileController.create);

router.get("/", ProfileController.getAll);
router.put("/:id", ProfileController.update);


module.exports = router;
