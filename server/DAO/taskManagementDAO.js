const Task = require("../models/task");

const getTaskDAO = async (data) => {
    try {
        const tasks = await Task.findAll({
            where: {
                collid: data,
            },
        });
        if (tasks) {
            return tasks;
        }
    } catch (err) {
        return "Can't Connect to database.Try again later " + err;
    }
};
const addTaskDAO = async (data) => {
    try {
        const task = await Task.create({
            collid: data.collid,
            task: data.task,
        });
        if (task) {
            return task;
        }
    } catch (err) {
        return "Can't Connect to database.Try again later " + err;
    }
};
const updateTaskDAO = async (data) => {
    try {
        const task = await Task.update(
            {
                completed: data.completed,
            },
            {
                where: {
                    taskid: data.taskid,
                },
            }
        );
        if (task) {
            return task;
        }
    } catch (err) {
        return "Can't Connect to database.Try again later " + err;
    }
};
const deleteTaskDAO = async (data) => {
    try {
        const task = await Task.destroy({
            where: {
                taskid: data,
            },
        });

        if (task) {
            console.log(task);
            return "Successfully deleted";
        } else {
            return "No data Exist ";
        }
    } catch (err) {
        return "Can't Connect to database.Try again later " + err;
    }
};

module.exports = { getTaskDAO, addTaskDAO, updateTaskDAO, deleteTaskDAO };
