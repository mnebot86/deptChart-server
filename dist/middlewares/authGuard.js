"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthed = void 0;
const express_1 = require("@clerk/express");
const http_status_codes_1 = require("http-status-codes");
const ensureAuthed = (req, res, next) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
    return next();
};
exports.ensureAuthed = ensureAuthed;
//# sourceMappingURL=authGuard.js.map