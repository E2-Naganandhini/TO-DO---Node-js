const express = require("express");
const cors = require("cors");
const User = require("./routes/user");
const Collection = require("./routes/collection");
const Task = require("./routes/task");
const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//Databse
const db = require("./config/database");

/* db.models.users.hasMany(db.models.collections);
db.models.collections.belongsTo(db.models.users); */

//Test DB
const log4js = require("log4js");

log4js.configure({
    appenders: {
        userManagement: { type: "file", filename: "log/userManegement.log" },
        collectionManagement: {
            type: "file",
            filename: "log/collectionManagement.log",
        },
        taskManagement: {
            type: "file",
            filename: "log/taskManagement.log",
        },
    },
    categories: {
        default: { appenders: ["userManagement"], level: "error" },
        default: { appenders: ["collectionManagement"], level: "error" },
        default: { appenders: ["taskManagement"], level: "error" },
    },
});

db.authenticate()
    .then(() => console.log("Database Connected.."))
    .catch((err) => console.log("Error:" + err));

app.get("/", (req, res) => res.send("INDEX"));

app.use("/user", User);

app.use("/collection", Collection);

app.use("/task", Task);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
