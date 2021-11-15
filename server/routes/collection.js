const express = require("express");
const router = express.Router();
const collectionManagement = require("../service/collectionManagement");

router.get("/", collectionManagement.getCollection);
router.post("/add", collectionManagement.addCollection);


module.exports = router;
