"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const http_status_codes_1 = require("http-status-codes");
const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            message: "Validation error",
            errors: error.errors,
        });
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map