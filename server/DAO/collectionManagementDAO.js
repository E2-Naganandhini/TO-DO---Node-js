const Collection = require("../models/collection");

const getCollectionDAO = async (data) => {
    var data;
    const collections = await Collection.findAll({
        where: {
            userid: data,
        },
    });
    var len = collections.length;
    console.log(len);
    if (len > 0) {
        data = {
            status: 200,
            message: "Successfully fetch Collection data",
            data: collections,
        };
        return data;
    } else {
        data = {
            status: 204,
            message: "No Collection available for this User",
        };
        return data;
    }
};

const addCollectionDAO = async (data) => {
    try {
        const collections = await Collection.create({
            userid: data.userid,
            collection: data.collection,
        });
        if (collections) {
            return collections;
        }
    } catch (err) {
        return "Can't Connect to database.Try again later " + err;
    }
};

module.exports = { getCollectionDAO, addCollectionDAO };
