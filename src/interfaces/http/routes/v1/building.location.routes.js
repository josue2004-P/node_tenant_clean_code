const express = require("express");
const router = express.Router();
const authentication = require("../../middlewares/authentication.middleware");
const BuildingLocationController = require("../../controllers/BuildingLocationController");
const validateFields = require("../../middlewares/validateFields");

router.post(
  "/",
  BuildingLocationController.create
);
router.get("/", BuildingLocationController.getAll);
router.get(
  "/:id",
  BuildingLocationController.getById
);
router.put("/:id", BuildingLocationController.update);
router.delete("/:id", BuildingLocationController.deleted);

module.exports = router;
