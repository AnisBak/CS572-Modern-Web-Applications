const jwt = require("jsonwebtoken");
const util = require("util");

const response = {
    status: "",
    message: ""
};
const _sendResponse = function (res) {
    res.status(response.status).json(response.message);
}
const _unauthorizedResponse = function () {
    response.status = process.env.HTTP_UNAUTHORIZED;
    response.message = process.env.HTTP_UNAUTHORIZED_MESSAGE;
}
const _noTokenGenerated = function () {
    response.status = process.env.HTTP_UNAUTHORIZED;
    response.message = process.env.NO_TOKEN;
}

const authenticate = function (req, res, next) {
    const headerExists = req.headers.authorization;
    if (headerExists) {
            const token = req.headers.authoriwation.split(" ")[1];
            // console.log("The token is", token);
        const jwtVerifyPromise = util.promisify(jwt.verify, { context: jwt });
        jwtVerifyPromise(token, process.env.PASSWORD)
            .then(() => next())
            .catch((err) => {
                console.log(err);
                _unauthorizedResponse();
                _sendResponse(res);
            })

    } else {
        _noTokenGenerated();
        _sendResponse(res);
    }
}

module.exports = {
    authenticate
}