const express = require("express");
const router = express.Router();
const authentication = require("../../middlewares/authentication.middleware");
const ProfileController = require("../../controllers/ProfileController");
const {
  validateCreateProfile,
} = require("../../validations/profile.validation");
const validateFields = require("../../middlewares/validateFields");

router.post(
  "/",
  authentication,
  validateCreateProfile("en"),
  validateFields,
  ProfileController.create
);
router.get("/", authentication, ProfileController.getAll);
router.get(
  "/:id",
  authentication,

  ProfileController.getById
);
router.put("/:id", authentication, ProfileController.update);
router.delete("/:id", authentication, ProfileController.deleted);

module.exports = router;
