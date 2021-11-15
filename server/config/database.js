const Sequelize = require("sequelize");

module.exports = new Sequelize("todo", "root", "root", {
    host: "localhost",
    dialect: "mariadb",
    define: {
        timestamps: false,
    },
});
