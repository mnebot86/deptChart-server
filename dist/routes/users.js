"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_1 = require("./../dto/validate");
const express_1 = require("express");
const users_1 = require("../controllers/users");
const createUser_1 = require("../dto/createUser");
const router = (0, express_1.Router)();
router.get('/me', users_1.getLoggedUser);
router.post('/register', (0, validate_1.validate)(createUser_1.createUserAtRegisterSchema), users_1.createUserAtRegister);
exports.default = router;
//# sourceMappingURL=users.js.map