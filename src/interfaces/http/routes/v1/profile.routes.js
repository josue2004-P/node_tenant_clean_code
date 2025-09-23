const express = require("express");
const router = express.Router();
const ProfileController = require("../../controllers/ProfileController");

router.post("/", ProfileController.create);

router.get("/", ProfileController.getAll);

module.exports = router;
