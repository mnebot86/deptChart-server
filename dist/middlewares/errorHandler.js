"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("../utils/logger");
const errorHandler = (err, _req, res, _next) => {
    logger_1.logger.error({ err }, 'Unhandled error');
    res.status(err?.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: err?.message || 'Internal Server Error'
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map