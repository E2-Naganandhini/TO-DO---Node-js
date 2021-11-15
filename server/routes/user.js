const express = require("express");
const router = express.Router();
const userManagement = require("../service/userManagement");

router.post("/register", userManagement.registerAccount);
router.post("/login", userManagement.loginAccount);
 
module.exports = router;
