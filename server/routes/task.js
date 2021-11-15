const express = require("express");
const router = express.Router();
const taskManagement = require("../service/taskManagement");

router.get("/", taskManagement.getTask);
router.post("/add", taskManagement.addTask);
router.post("/update", taskManagement.updateTask);
router.post("/delete", taskManagement.deleteTask);

module.exports = router;
