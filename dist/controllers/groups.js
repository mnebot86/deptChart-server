"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroup = void 0;
const logger_1 = require("../utils/logger");
const groups_1 = __importDefault(require("../models/groups"));
const createGroup = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Group name is required' });
        }
        const group = new groups_1.default({ name });
        const savedGroup = await group.save();
        return res.status(201).json(savedGroup);
    }
    catch (error) {
        logger_1.logger.error('Error creating group:', error);
        return res.status(500).json({ message: 'Failed to create group', error: error.message });
    }
};
exports.createGroup = createGroup;
//# sourceMappingURL=groups.js.map