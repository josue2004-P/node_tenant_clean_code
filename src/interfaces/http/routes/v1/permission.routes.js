const express = require("express");
const router = express.Router();
const PermissionController = require("../../controllers/PermissionController");
const {
  validateCreatePermission,
} = require("../../validations/permission.validation");
const validateFields = require("../../middlewares/validateFields");

router.post(
  "/",
  validateCreatePermission("en"),
  validateFields,
  PermissionController.create
);
router.get("/", PermissionController.getAll);
router.get("/:id", PermissionController.getById);
router.put("/:id", PermissionController.update);
router.delete("/:id", PermissionController.deleted);

module.exports = router;
