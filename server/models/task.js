const Sequelize = require("sequelize");
const db = require("../config/database");
const Task = db.define(
    "tasks",
    {
        taskid: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            require: true,
            allowNull: false,
            primaryKey: true,
        },

        task: {
            type: Sequelize.STRING,
            require: true,
            allowNull: false,
        },
        completed: {
            type: Sequelize.BOOLEAN,
            required: true,
            defaultValue: false,
        },
        collid: {
            type: Sequelize.INTEGER,
            require: true,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Task;
