const Sequelize = require("sequelize");
const db = require("../config/database");
const Collection = db.define(
    "collections",
    {
        collid: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            require: true,
            allowNull: false,
            primaryKey: true,
        },

        collection: {
            type: Sequelize.STRING,
            require: true,
            allowNull: false,
        },
        userid: {
            type: Sequelize.INTEGER,
            require: true,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Collection;
