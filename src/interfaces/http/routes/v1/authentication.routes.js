const express = require("express");
const router = express.Router();
const authentication = require("../../middlewares/authentication.middleware");
const AuthenticationController = require("../../controllers/AuthenticationController");

const {
  validateLoginUser,
} = require("../../validations/authentication.validation");
const validateFields = require("../../middlewares/validateFields");


router.post(
  "/",
  validateLoginUser("en"),
  validateFields,
  AuthenticationController.login
);

router.get("/renew-token", authentication, AuthenticationController.renewToken);

module.exports = router;
