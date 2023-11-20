const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userControllers.js");
const authenticate = require("../middleware/authenticate.js");

// API for user registration
router.post("/register", UserController.userRegister);

// API for user login using Email or Username
router.post("/login", UserController.userLogin);

// API for user logout to remove cookies
router.post("/logout", UserController.userLogout);

module.exports = router;
