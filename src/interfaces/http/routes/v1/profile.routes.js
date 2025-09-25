const express = require("express");
const router = express.Router();
const ProfileController = require("../../controllers/ProfileController");
const {
  validateCreateProfile,
} = require("../../validations/profile.validation");
const validateFields = require("../../middlewares/validateFields");

router.post(
  "/",
  validateCreateProfile("en"),
  validateFields,
  ProfileController.create
);
router.get("/", ProfileController.getAll);
router.get("/:id", ProfileController.getById);
router.put("/:id", ProfileController.update);
router.delete("/:id", ProfileController.deleted);

module.exports = router;
