const userManagementDAO = require("../DAO/userManagementDAO");
const log4js = require("log4js");
const infoLogger = log4js.getLogger("userManagement");
const errorLogger = log4js.getLogger("error");
const registerAccount = async (req, res) => {
    var finalResult;
    try {
        if (
            req.body.username != null &&
            req.body.email != null &&
            req.body.password != null
        ) {
            const resData = await userManagementDAO.registerUser(req.body);
            finalResult = {
                status: 200,
                messsage: "Successfully created",
            };
            res.send(finalResult);
        } else {
            finalResult = {
                status: 400,
                message: "Invalid Parameters.Enter all parameters",
            };
            res.send(finalResult);
        }
    } catch (err) {
        finalResult = {
            status: 500,
            message: "Network Error.Try Again later",
        };
        res.send(finalResult);
        infoLogger.error("Error occured while updating user: ", err);
        errorLogger.error("Error occured while updating user: ", err);
    }
};

const loginAccount = async (req, res) => {
    try {
        if (req.body.email != null && req.body.password != null) {
            var finalResult;
            var resData = await userManagementDAO.loginUser(req.body);

            if (resData.status) {
                if (resData.status === 200) {
                    finalResult = {
                        status: 200,
                        data: resData.data,
                        message: "Successfull Login",
                    };
                    res.send(finalResult);
                } else {
                    if (resData.status === 204) {
                        finalResult = {
                            status: 204,
                            data: "",
                            message: "Invalid Username anmd password",
                        };
                        res.send(finalResult);
                    }
                }
            }
        } else {
            var finalResult = {
                status: 400,
                message: "Missing Parameters.Enter all parameters",
            };
            res.send(finalResult);
        }
    } catch (err) {
        var finalResult = {
            status: 500,
            message: "Network Error",
        };
        res.send(finalResult);
        infoLogger.error("Error occured while updating user: ", err);
        errorLogger.error("Error occured while updating user: ", err);
    }
};

module.exports = { registerAccount, loginAccount };
