const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/authToken");

const registerUser = async (data) => {
    const user = await User.create({
        username: data.username,
        email: data.email,
        password: data.password,
    });
    const userJson = user.toJSON();
    return { status: 200, data: userJson };
};

const loginUser = async (data) => {
    const loginuser = await User.findOne({
        where: {
            email: data.email,
        },
    });

    if (!loginuser) {
        return { status: 204, message: "User Not found." };
    }

    var passwordIsValid = bcrypt.compareSync(
        data.password,
        loginuser.dataValues.password
    );

    if (!passwordIsValid) {
        return {
            status: 204,
            accessToken: null,
            message: "Invalid Password!",
        };
    }
    var token = jwt.sign({ id: loginuser.id }, config.secret, {
        expiresIn: 86400, // 24 hours
    });
    var data = {
        id: loginuser.dataValues.userid,
        username: loginuser.dataValues.username,
        email: loginuser.dataValues.email,
        password: loginuser.dataValues.password,
        accessToken: token,
    };
    return {
        status: 200,
        data: data,
        message: "Successfully Logged In",
    };
};

module.exports = { registerUser, loginUser };
