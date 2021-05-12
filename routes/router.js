const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const authMiddleware = require("./../middlewares/auth");

router.post("/register", userController.register);

router.post("/login", authController.login);

router.get("/users", authMiddleware.authenticateToken, userController.users);

router.patch("/users/:id", authMiddleware.authenticateToken, userController.updateUser);

router.delete("/users/:id", authMiddleware.authenticateToken, userController.deleteUser);

router.get("/users/search/", authMiddleware.authenticateToken, userController.searchUser);

module.exports = router;
