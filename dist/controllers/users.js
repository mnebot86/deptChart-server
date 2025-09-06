"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedUser = exports.createUserAtRegister = void 0;
const http_status_codes_1 = require("http-status-codes");
const express_1 = require("@clerk/express");
const users_1 = __importDefault(require("../models/users"));
const logger_1 = require("../utils/logger");
const createUserAtRegister = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
    const { email, firstName, lastName } = req.body || {};
    try {
        const existingUser = await users_1.default.findOne({ clerkId: userId });
        if (existingUser) {
            logger_1.logger.info({
                clerkId: userId,
                userMongoId: existingUser._id
            }, '[users] createUserAtRegister - user exists');
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                created: false,
                user: existingUser,
            });
        }
        const newUser = new users_1.default({ clerkId: userId, email, firstName, lastName });
        await newUser.save();
        logger_1.logger.info({ clerkId: userId, created: true, userMongoId: newUser._id }, '[users] createUserAtRegister - user created');
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            created: true,
            user: newUser,
        });
    }
    catch (err) {
        logger_1.logger.error({ err, clerkId: userId }, '[users] createUserAtRegister failed');
        const isDup = err?.code === 11000;
        return res
            .status(isDup ? http_status_codes_1.StatusCodes.CONFLICT : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: isDup ? 'User with that email already exists' : 'Failed to create user' });
    }
};
exports.createUserAtRegister = createUserAtRegister;
const getLoggedUser = async (req, res) => {
    const { userId } = (0, express_1.getAuth)(req);
    if (!userId) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
    }
    try {
        const user = await users_1.default.findOne({ clerkId: userId });
        if (!user) {
            logger_1.logger.info({ clerkId: userId }, '[users] getLoggedUser - user not found');
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
        logger_1.logger.info({ clerkId: userId, userMongoId: user._id }, '[users] getLoggedUser - user found');
        return res.status(http_status_codes_1.StatusCodes.OK).json({ user });
    }
    catch (err) {
        logger_1.logger.error({ err, clerkId: userId }, '[users] getLoggedUser failed');
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to fetch user' });
    }
};
exports.getLoggedUser = getLoggedUser;
//# sourceMappingURL=users.js.map