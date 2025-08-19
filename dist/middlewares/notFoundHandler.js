"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("../utils/logger");
const notFoundHandler = (req, res) => {
    const message = `Route not found: ${req.method} ${req.originalUrl}`;
    logger_1.logger.warn(message);
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message });
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=notFoundHandler.js.map