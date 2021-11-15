const taskManagementDAO = require("../DAO/taskManagementDAO");
const log4js = require("log4js");
const infoLogger = log4js.getLogger("taskManagement");
const errorLogger = log4js.getLogger("error");
const getTask = async (req, res) => {
    try {
        if (req.query.collid) {
            await taskManagementDAO
                .getTaskDAO(req.query.collid)
                .then((resData) => {
                    res.status(200);
                    res.send(resData);
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err);
                });
        } else {
            var finalResult = {
                status: "Failure",
                message: "No task avialable.Enter task",
            };
            res.send(finalResult);
        }
    } catch (err) {
        var finalResult = {
            status: 500,
            message: "Network Error",
        };
        res.send(finalResult);
        infoLogger.error("Error occured while fetching Task: ", err);
        errorLogger.error("Error occured while fetching Task: ", err);
    }
};
const addTask = async (req, res) => {
    try {
        if (req.query.collid && req.body.task !== null) {
            let data = {
                collid: req.query.collid,
                task: req.body.task,
            };
            await taskManagementDAO
                .addTaskDAO(data)
                .then((resData) => {
                    res.status(200);
                    res.send(resData);
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err);
                });
        } else {
            var finalResult = {
                status: "Failure",
                message: "Can't create Collection",
            };
            res.send(finalResult);
        }
    } catch (err) {
        var finalResult = {
            status: 500,
            message: "Network Error",
        };
        res.send(finalResult);
        infoLogger.error("Error occured while adding Task: ", err);
        errorLogger.error("Error occured while adding Task: ", err);
    }
};
const updateTask = async (req, res) => {
    try {
        if (req.query.taskid) {
            let data = {
                taskid: req.query.taskid,
                completed: req.body.completed,
            };
            await taskManagementDAO
                .updateTaskDAO(data)
                .then((resData) => {
                    res.status(200);
                    res.send(resData);
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err);
                });
        } else {
            var finalResult = {
                status: "Failure",
                message: "Can't create Collection",
            };
            res.send(finalResult);
        }
    } catch (err) {
        var finalResult = {
            status: 500,
            message: "Network Error",
        };
        res.send(finalResult);
        infoLogger.error("Error occured while updating Task: ", err);
        errorLogger.error("Error occured while updating Task: ", err);
    }
};
const deleteTask = async (req, res) => {
    try {
        if (req.query.taskid) {
            await taskManagementDAO
                .deleteTaskDAO(req.query.taskid)
                .then((resData) => {
                    res.status(200);
                    res.send(resData);
                })
                .catch((err) => {
                    res.status(400);
                    res.send(err);
                });
        } else {
            var finalResult = {
                status: "Failure",
                message: "Can't create Collection",
            };
            res.send(finalResult);
        }
    } catch (err) {
        infoLogger.error("Error occured while deleting  Task: ", err);
        errorLogger.error("Error occured while deleting  Task: ", err);
    }
};

module.exports = { getTask, addTask, updateTask, deleteTask };
