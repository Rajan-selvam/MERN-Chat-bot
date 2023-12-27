"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const constants_1 = require("./constants");
const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
exports.createToken = createToken;
const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${constants_1.COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({
            message: "Token Not Exist"
        });
    }
    return new Promise((resolve, reject) => {
        return (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({
                    message: "Token Expired",
                });
            }
            else {
                // console.log("Token Verification Successed");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token-manager.js.map