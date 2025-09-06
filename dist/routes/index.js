"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const groups_1 = __importDefault(require("./groups"));
const express_2 = require("@clerk/express");
const router = (0, express_1.Router)();
router.use('/users', (0, express_2.requireAuth)({ signInUrl: undefined }), users_1.default);
router.use('/groups', (0, express_2.requireAuth)({ signInUrl: undefined }), groups_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map