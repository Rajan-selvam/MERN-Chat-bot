"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatCompletionValidator = exports.signUpValidator = exports.loginValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty) {
                break;
            }
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
exports.validate = validate;
exports.loginValidator = [
    (0, express_validator_1.body)("email").trim().isEmail().withMessage("Enter Valid Email!"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({
        min: 6,
        max: 15,
    })
        .withMessage("Password should contain atleast 6 characters!"),
];
exports.signUpValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is Required!"),
    ...exports.loginValidator,
];
exports.chatCompletionValidator = [
    (0, express_validator_1.body)("message").notEmpty().withMessage("Message is Required!"),
];
//# sourceMappingURL=validators.js.map