const express = require("express");
const { register, login, getUserList, forgotPassword, resetPassword } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUserList);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);    

module.exports = router;
