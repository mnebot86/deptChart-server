"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserAtRegisterSchema = void 0;
const zod_1 = require("zod");
exports.createUserAtRegisterSchema = zod_1.z.object({
    email: zod_1.z.email(),
    firstName: zod_1.z.string().min(1, { message: 'First name is required' }),
    lastName: zod_1.z.string().min(1, { message: 'Last name is required' }),
});
//# sourceMappingURL=createUser.js.map