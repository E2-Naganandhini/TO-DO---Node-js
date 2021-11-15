const collectionManagementDAO = require("../DAO/collectionManagementDAO");
const log4js = require("log4js");
const infoLogger = log4js.getLogger("collectionManagement");
const errorLogger = log4js.getLogger("error");
const getCollection = async (req, res) => {
    try {
        if (req.query.userid) {
            let finalResult;
            let collections = await collectionManagementDAO.getCollectionDAO(
                req.query.userid
            );
            if (collections.status === 200) {
                finalResult = {
                    data: collections.data,
                    status: 200,
                    message: "Collection successfully fetched",
                };
                res.send(finalResult);
            }
            if (collections.status === 204) {
                finalResult = {
                    status: 204,
                    message: "No collection available for this User",
                };
                res.send(finalResult);
            }
        } else {
            finalResult = {
                status: 400,
                message: "No userId provided",
            };
            res.send(finalResult);
        }
    } catch (err) {
        var finalResult = {
            status: 500,
            message: "Network Error",
        };
        res.send(finalResult);
        infoLogger.error("Error occured while fetching Collection: ", err);
        errorLogger.error("Error occured while fetching Collection: ", err);
    }
};
const addCollection = async (req, res) => {
    try {
        if (req.query.userid) {
            let data = {
                userid: req.query.userid,
                collection: req.body.collection,
            };
            await collectionManagementDAO
                .addCollectionDAO(data)
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
        infoLogger.error("Error occured while adding Collection: ", err);
        errorLogger.error("Error occured while adding Collection: ", err);
    }
};

module.exports = { getCollection, addCollection };
