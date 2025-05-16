const express = require("express");
const { signup,
    login, 
    getTokens
 } = require("../controllers/loginController");
const verifyToken = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/refresh_token", verifyToken, getTokens)

module.exports = router;