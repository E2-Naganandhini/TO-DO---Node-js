const Sequelize = require("sequelize");
const db = require("../config/database");
const bcrypt = require("bcrypt");

const User = db.define(
    "users",
    {
        userid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

User.beforeCreate(async (user, options) => {
    if (user.dataValues.password) {
        const salt = await bcrypt.genSaltSync(10, "a");
        user.dataValues.password = bcrypt.hashSync(
            user.dataValues.password,
            salt
        );
    }
});

module.exports = User;
