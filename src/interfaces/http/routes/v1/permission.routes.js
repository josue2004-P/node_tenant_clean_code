const express = require("express");
const router = express.Router();
const authentication = require("../../middlewares/authentication.middleware");
const PermissionController = require("../../controllers/PermissionController");
const {
  validateCreatePermission,
} = require("../../validations/permission.validation");
const validateFields = require("../../middlewares/validateFields");

router.post(
  "/",
  authentication,
  validateCreatePermission("en"),
  validateFields,
  PermissionController.create
);
router.get("/", authentication, PermissionController.getAll);
router.get(
  "/:id",
  authentication,

  PermissionController.getById
);
router.put("/:id", authentication, PermissionController.update);
router.delete("/:id", authentication, PermissionController.deleted);

module.exports = router;
