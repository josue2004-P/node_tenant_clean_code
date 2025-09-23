const express = require("express");
const router = express.Router();
const PermissionController = require("../../controllers/PermissionController");

router.post("/", PermissionController.create);

router.get("/", PermissionController.getAll);

module.exports = router;
