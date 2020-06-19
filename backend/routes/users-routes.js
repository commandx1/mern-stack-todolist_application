const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/users-controller");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signUp
);

router.get("/:uid", usersController.getUserById);

router.post("/login", usersController.login);

router.post("/googleLogin", usersController.googleLogin);

router.patch(
  "/:uid",
  check("email").normalizeEmail().isEmail(),
  check("name").not().isEmpty(),
  usersController.updateUsername
);

router.patch("/:uid/background", usersController.updateBackground)

module.exports = router;
