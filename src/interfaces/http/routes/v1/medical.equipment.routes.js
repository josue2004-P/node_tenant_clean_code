const express = require("express");
const router = express.Router();
const authentication = require("../../middlewares/authentication.middleware");
const BuildingLocationController = require("../../controllers/BuildingLocationController");
const validateFields = require("../../middlewares/validateFields");

router.post(
  "/",
  MedicalController.create
);

module.exports = router;
