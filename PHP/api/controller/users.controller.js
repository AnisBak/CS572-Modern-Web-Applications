
const mongoose = require("mongoose");
require("../data/users-model");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User"); // When app starts only this one get executed
const bcrypt = require("bcrypt");
require("dotenv").config();


let response = { status: "", message: "" };
let userName = "";

const _sendResponse = function (res) {
    res.status(response.status).json(response.message);
}

const _positiveResponse = function (album) { 
    response.status = process.env.HTTP_OK;
    response.message = album;
}

const _errorResponse = function (err) {
    response.status = process.env.HTTP_GENERIC_ERROR
    response.message = err;
}

const _unauthorizedResponse = function () {
    response.status = process.env.HTTP_UNAUTHORIZED;
    response.message = HTTP_UNAUTHORIZED_MESSAGE;
}

const _authorizedResponse = function (token) {
    response.status = process.env.HTTP_OK;
    response.message = {
        success: true,
        token: token
    }
}

const _generatehash = function (saltValue, password) {
    return bcrypt.hash(password, saltValue);

}


const _createuser = function (_name, _username, _hashedPassword) {
    const newUser = {
        username: _username,
        name: _name,
        password: _hashedPassword
    };
    console.log("User", newUser);
    return User.create(newUser);

}

const addOne = function (req, res) {
    console.log("User controller AddOne request");
    console.log(req.body);
    if (req.body && req.body.username && req.body.password) {
            
        bcrypt.genSalt(process.env.SALT)
            .then((saltValue) => _generatehash(saltValue, req.body.password))
            .then((hashedPassword) => _createuser(req.body.name, req.body.username, hashedPassword))
            .then((user) => _positiveResponse(user))
            .catch((err) => _errorResponse(err))
            .finally(() => _sendResponse(res));
    }

}
const _authenticate = function (user, reqPass, pass) {
    userName = user.name;
    return bcrypt.compare(reqPass, pass);
}

const _generateToken = function (userName, bool) {
    return new Promise(function (resolve, reject) {
        if (bool) {
            resolve(jwt.sign({ name: userName },process.env.PASSWORD, { expiresIn: process.env.TOKEN_EXPIRE }))
        }
        else {
            reject();
        }
    });
}

const getOne = function (req, res) {
    if (req.body && req.body.username && req.body.password) {
        User.findOne({ username: req.body.username })
            .then((user) => _authenticate(user, req.body.password, user.password))
            .then((bool) => _generateToken(userName, bool))
            .then((token) => _authorizedResponse(token))
            .catch(() => _unauthorizedResponse())
            .finally(() => _sendResponse(res))
    }

}

module.exports = {
    getOne,
    addOne,
    // deleteOne

}



